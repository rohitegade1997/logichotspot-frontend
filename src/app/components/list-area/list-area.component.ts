import { Component, OnInit, ViewChild } from '@angular/core';
import { LogichotspotService } from '../../service/logichotspot.service';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-list-area',
  templateUrl: './list-area.component.html',
  styleUrls: ['./list-area.component.css']
})
export class ListAreaComponent implements OnInit {
  bgbtn = "#6d0106";
  dataArr: any;
  displayedColumns = ['title', 'edit', 'active', 'delete'];
  searchText: String;
  resultLength: any;
  total: number;
  totalpage: any;
  limitFilter: string = '5';
  pageUrl: string;
  startno: any;
  endno: any;
  currentpage: any;

  constructor(private lh: LogichotspotService, private route: Router) { }

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.getAreas();
  }

  editArea(areaId) {
    this.route.navigate(['edit_area', btoa(areaId)]);
  }

  deleteArea(areaId) {
    this.lh.removeArea(areaId).subscribe(res => {
      console.log(res);
      alert(res['message']);
      window.location.href = "http://localhost:4200/areas";
    });
  }

  changeStatus(areaId, status) {
    this.lh.updateToggleStatus(areaId, status).subscribe(res => {
    });
  }

  searchArea() {
    if (this.searchText == " ") {
      return false;
    } else {
      this.lh.searchAreaInDb(this.searchText).subscribe(result => {
        this.dataArr = "";
        this.dataArr = result;
        this.dataArr = new MatTableDataSource<any>(this.dataArr);
        this.dataArr.sort = this.sort;
      });
    }
  }

  applyLimit(val) {
    this.limitFilter = val;
    this.getAreas();
  }

  nextPage(pageNo) {
    let sendParam = {
      'limit': this.limitFilter
    }
    this.lh.serverPagination(this.pageUrl + '?page=' + pageNo, sendParam).subscribe(data => {
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

  getAreas() {
    let sendParam = {
      'limit': this.limitFilter
    }
    let api = 'get_areas/';
    this.lh.getLimitAreas(api, sendParam).subscribe(data => {
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

  createNewArea(){
    this.route.navigate(['create_area']);
  }
}
