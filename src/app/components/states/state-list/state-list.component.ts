import { Component, OnInit,ViewChild } from '@angular/core';
import {StateService} from '../../../service/state_service/state.service';
import { MatSort } from '@angular/material/sort';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-state-list',
  templateUrl: './state-list.component.html',
  styleUrls: ['./state-list.component.css']
})
export class StateListComponent implements OnInit {

  dataArr: any;
  displayedColumns = ['name', 'active'];
  searchText: String;
  resultLength: any;
  total: number;
  totalpage: any;
  limitFilter: string = '500';
  pageUrl: string;
  startno: any;
  endno: any;
  currentpage: any;

  constructor(private stateService: StateService, private fb: FormBuilder, private route: Router) { }

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit(): void {
    this.getStates();
  }

  getStates() {
    let sendParam = {
      'limit': this.limitFilter
    }
    let api = 'get_states';
    this.stateService.getStateData(api, sendParam).subscribe(data => {
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

  searchState() {
    let api='search_state/';
    if (this.searchText == " ") {
      return false;
    } else {
      this.stateService.searchStateInDb(api,this.searchText).subscribe(result => {
        this.dataArr = "";
        this.dataArr = result;
        this.dataArr = new MatTableDataSource<any>(this.dataArr);
        this.dataArr.sort = this.sort;
      });
    }
  }

  applyLimit(val) {
    this.limitFilter = val;
    this.getStates();
  }

  changeStatus(CountryId, status) {
    let api = 'change_state_status/';
    if (status == 1) {
      var statusStr = '{"active":1}';
    }
    if (status == 0) {
      var statusStr = '{"active":0}';
    }
    var jsonObj = JSON.parse(statusStr);
    this.stateService.updateToggleStatus(api, CountryId, jsonObj).subscribe(res => {
    });
  }

  nextPage(pageNo) {
    let sendParam = {
      'limit': this.limitFilter
    }
    this.stateService.serverPagination(this.pageUrl + '?page=' + pageNo, sendParam).subscribe(data => {
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
