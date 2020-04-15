import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Demo1Service } from '../../../service/demo1_service/demo1.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { validation } from '../../../config/customValidation';

@Component({
  selector: 'app-demo1-list',
  templateUrl: './demo1-list.component.html',
  styleUrls: ['./demo1-list.component.css']
})
export class Demo1ListComponent implements OnInit {

  bgbtn = "#6d0106";
  dataArr: any;
  displayedColumns = ['firstName', 'lastName', 'phone', 'edit', 'delete'];
  searchText: String;
  resultLength: any;
  total: number;
  totalpage: any;
  limitFilter: string = '5';
  pageUrl: string;
  startno: any;
  endno: any;
  currentpage: any;
  submitted = false;

  addRecordForm: FormGroup;
  firstName: FormControl;
  lastName: FormControl;
  phone: FormControl;

  constructor(private demo1Service: Demo1Service, private fb: FormBuilder) { }

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit(): void {
    this.getDemo();
    this.addRecordFormGroup();
  }

  addRecordFormGroup() {
    this.addRecordForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      phone: ['', [Validators.required, Validators.pattern(validation.indianPhone)]]
    });
  }

  getDemo() {
    let sendParam = {
      'limit': this.limitFilter
    }
    let api = 'get_demo1';
    this.demo1Service.getDemoData(api, sendParam).subscribe(data => {
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

  searchName() {
    let api = 'search_name/';

    if (this.searchText == " ") {
      return false;
    } else {
      this.demo1Service.searchNameInDb(api, this.searchText).subscribe(result => {
        this.dataArr = "";
        this.dataArr = result;
        this.dataArr = new MatTableDataSource<any>(this.dataArr);
        this.dataArr.sort = this.sort;
      });
    }
  }

  addNewRecord() {
    //console.log(this.addRecordForm.value);
    if (this.addRecordForm.valid) {
      let api = 'add_new_record';
      this.demo1Service.addNewRecordData(api, this.addRecordForm.value).subscribe(data => {
        alert(data['message']);
        location.reload();
      });
    } else if (this.addRecordForm.invalid) {
      this.submitted = true;
    }
  }

  nextPage(pageNo) {
    let sendParam = {
      'limit': this.limitFilter
    }
    this.demo1Service.serverPagination(this.pageUrl + '?page=' + pageNo, sendParam).subscribe(data => {
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

  applyLimit(val) {

  }

  editName(nameId) {

  }

  deleteName(nameId) {

  }


}
