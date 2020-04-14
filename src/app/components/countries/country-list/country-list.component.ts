import { Component, OnInit,ViewChild } from '@angular/core';
import {CountryService} from '../../../service/country_service/country.service';
import { MatSort } from '@angular/material/sort';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css']
})
export class CountryListComponent implements OnInit {

  dataArr: any;
  displayedColumns = ['name', 'active'];
  searchText: String;
  resultLength: any;
  total: number;
  totalpage: any;
  limitFilter: string = '20';
  pageUrl: string;
  startno: any;
  endno: any;
  currentpage: any;
  

  constructor(private countryService: CountryService, private fb: FormBuilder, private route: Router) { }

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit(): void {
    this.getCountries();
  }

  getCountries() {
    let sendParam = {
      'limit': this.limitFilter
    }
    let api = 'get_countries';
    this.countryService.getCountryData(api, sendParam).subscribe(data => {
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
  
  searchCountry() {
    let api='search_country/';
    if (this.searchText == " ") {
      return false;
    } else {
      this.countryService.searchCountryInDb(api,this.searchText).subscribe(result => {
        this.dataArr = "";
        this.dataArr = result;
        this.dataArr = new MatTableDataSource<any>(this.dataArr);
        this.dataArr.sort = this.sort;
      });
    }
  }

  applyLimit(val) {
    this.limitFilter = val;
    this.getCountries();
  }

  changeStatus(countryId, status) {
    console.log(countryId);
    console.log(status);
    let api = 'change_country_status/';
    if (status == 1) {
      var statusStr = '{"active":1}';
    }
    if (status == 0) {
      var statusStr = '{"active":0}';
    }
    var jsonObj = JSON.parse(statusStr);
    this.countryService.updateToggleStatus(api, countryId, jsonObj).subscribe(res => {
    });
  }

  nextPage(pageNo) {
    let sendParam = {
      'limit': this.limitFilter
    }
    this.countryService.serverPagination(this.pageUrl + '?page=' + pageNo, sendParam).subscribe(data => {
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
