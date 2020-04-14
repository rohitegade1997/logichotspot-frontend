import { Component, OnInit,ViewChild } from '@angular/core';
import {CityService} from '../../../service/city_service/city.service';
import { MatSort } from '@angular/material/sort';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.css']
})
export class CityListComponent implements OnInit {

  dataArr: any;
  displayedColumns = ['name', 'active'];
  searchText: String;
  resultLength: any;
  total: number;
  totalpage: any;
  limitFilter: string = '20000';
  pageUrl: string;
  startno: any;
  endno: any;
  currentpage: any;

  constructor(private cityService: CityService, private fb: FormBuilder, private route: Router) { }

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit(): void {
    this.getCities();
  }

  getCities() {
    let sendParam = {
      'limit': this.limitFilter
    }
    let api = 'get_cities';
    this.cityService.getCityData(api, sendParam).subscribe(data => {
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

  searchCity() {
    let api='search_city/';
    if (this.searchText == " ") {
      return false;
    } else {
      this.cityService.searchCityInDb(api,this.searchText).subscribe(result => {
        this.dataArr = "";
        this.dataArr = result;
        this.dataArr = new MatTableDataSource<any>(this.dataArr);
        this.dataArr.sort = this.sort;
      });
    }
  }

  applyLimit(val) {
    this.limitFilter = val;
    this.getCities();
  }

  changeStatus(cityId, status) {
    let api = 'change_city_status/';
    if (status == 1) {
      var statusStr = '{"active":1}';
    }
    if (status == 0) {
      var statusStr = '{"active":0}';
    }
    var jsonObj = JSON.parse(statusStr);
    this.cityService.updateToggleStatus(api, cityId, jsonObj).subscribe(res => {
    });
  }

  nextPage(pageNo) {
    let sendParam = {
      'limit': this.limitFilter
    }
    this.cityService.serverPagination(this.pageUrl + '?page=' + pageNo, sendParam).subscribe(data => {
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

}
