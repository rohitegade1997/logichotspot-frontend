import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { BusinessService } from '../../../service/business_service/business.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-business-list',
  templateUrl: './business-list.component.html',
  styleUrls: ['./business-list.component.css']
})
export class BusinessListComponent implements OnInit {

  bgbtn = "#6d0106";
  dataArr: any;
  displayedColumns = ['name', 'active', 'edit', 'delete'];
  searchText: String;
  resultLength: any;
  total: number;
  totalpage: any;
  limitFilter: string = '5';
  pageUrl: string;
  startno: any;
  endno: any;
  currentpage: any;
  editCatId: number;

  constructor(private businessService: BusinessService, private fb: FormBuilder, private route: Router) { }

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit(): void {
    this.getBusinesses();
  }

  getBusinesses() {
    let sendParam = {
      'limit': this.limitFilter
    }
    let api = 'get_businesses';
    this.businessService.getBusinessData(api, sendParam).subscribe(data => {
      console.log(data);
      this.dataArr = data['data'];
      this.dataArr = new MatTableDataSource<any>(this.dataArr);
      this.dataArr.sort = this.sort;
      this.total = data['total'];
      this.pageUrl = data['path'];
      this.totalpage = new Array(data['last_page']);
      this.startno = data['from'];
      this.endno = data['to'];
      this.currentpage = data['current_page'];
    });
  }
  searchBusiness() {
    let api='search_business/';
    if (this.searchText == " ") {
      return false;
    } else {
      this.businessService.searchBusinessInDb(api,this.searchText).subscribe(result => {
        this.dataArr = "";
        this.dataArr = result;
        this.dataArr = new MatTableDataSource<any>(this.dataArr);
        this.dataArr.sort = this.sort;
      });
    }
  }

  applyLimit(val) {
    this.limitFilter = val;
    this.getBusinesses();
  }

  nextPage(pageNo) {
    let sendParam = {
      'limit': this.limitFilter
    }
    this.businessService.serverPagination(this.pageUrl + '?page=' + pageNo, sendParam).subscribe(data => {
      this.dataArr = "";
      this.dataArr = data['data'];
      this.dataArr = new MatTableDataSource<any>(this.dataArr);
      this.dataArr.sort = this.sort;
      this.total = data['total'];
      this.pageUrl = data['path'];
      this.totalpage = new Array(data['last_page']);
      this.startno = data['from'];
      this.endno = data['to'];
      this.currentpage = data['current_page'];
    });
  }

  changeStatus(BusId, status) {
    let api = 'change_status/';
    if (status == 1) {
      var statusStr = '{"active":1}';
    }
    if (status == 0) {
      var statusStr = '{"active":0}';
    }
    var jsonObj = JSON.parse(statusStr);
    this.businessService.updateToggleStatus(api, BusId, jsonObj).subscribe(res => {
    });
  }

  editBusiness(BusId) {
    this.route.navigate(['edit_business', btoa(BusId)]);
  }

  deleteBusiness(BusId) {
    let api= 'delete_business/';
    this.businessService.removeBusiness(api,BusId).subscribe(res => {
      console.log(res);
      alert(res['message']);
      location.reload();
    });
  }

  updateBusiness() {

  }

  addNewBusiness() {
    this.route.navigate(['add_business']);
  }

}
