import { Component, OnInit, ViewChild } from '@angular/core';
import { LogichotspotService } from '../../../service/logichotspot.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { validation } from '../../../config/customValidation';
@Component({
  selector: 'app-black-list',
  templateUrl: './black-list.component.html',
  styleUrls: ['./black-list.component.css']
})
export class BlackListComponent implements OnInit {

  bgbtn = "#6d0106";
  dataArr: any;
  displayedColumns = ['title', 'mac', 'attempt', 'edit', 'delete'];
  searchText: String;
  resultLength: any;
  total: number;
  totalpage: any;
  limitFilter: string = '5';
  pageUrl: string;
  startno: any;
  endno: any;
  currentpage: any;
  placeList: any;
  editBlacklistedId: number;
  submitted = false;

  myForm: FormGroup;
  place: FormControl;
  macid: FormControl;

  editBlacklistedForm: FormGroup;
  macAddress: FormControl;

  constructor(private lh: LogichotspotService, private fb: FormBuilder, private route: Router) { }

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit(): void {
    this.getBlacklists();
    this.placesList();
    this.addNewGroup();
    this.editBlacklistedGroup();
  }

  getBlacklists() {
    let sendParam = {
      'limit': this.limitFilter
    }
    let api = 'get_blacklists/';
    this.lh.getBlacklistData(api, sendParam).subscribe(data => {
      //console.log(data);
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

  addNewBlacklist() {

  }

  //get all places
  placesList() {
    let api = 'get_places';
    this.lh.getPlaces(api).subscribe(data => {
      //console.log(data);
      this.placeList = data;
    });
  }

  //grouping 'Add new' form fields
  addNewGroup() {
    this.myForm = this.fb.group({
      place: [''],
      macid: ['', [Validators.required, Validators.pattern(validation.mac)]],
      attempt: ['', [Validators.required, Validators.pattern(validation.attempt)]]
    });
  }

  editBlacklistedGroup() {
    this.editBlacklistedForm = this.fb.group({
      mac: ['', [Validators.required, Validators.pattern(validation.mac)]]
    });
  }

  searchBlacklist() {
    if (this.searchText == " ") {
      return false;
    } else {
      this.lh.searchBlacklistedPlace(this.searchText).subscribe(result => {
        this.dataArr = "";
        this.dataArr = result;
        this.dataArr = new MatTableDataSource<any>(this.dataArr);
        this.dataArr.sort = this.sort;
      });
    }
  }

  applyLimit(val) {
    this.limitFilter = val;
    this.getBlacklists();
  }

  deleteBlacklisted(Id) {
    let api = 'delete_blacklisted/'
    this.lh.removeBlacklisted(api, Id).subscribe(data => {
      alert(data['message']);
      location.reload();
    });
  }

  editBlacklisted(Id) {
    this.getBlacklistedPerId(Id);
    this.editBlacklistedId = Id;
  }

  getBlacklistedPerId(Id) {
    let api = 'get_blacklisted_by_id/';
    this.lh.getBlacklistedById(Id, api).subscribe(data => {
      this.editBlacklistedForm.setValue({ mac: data[0].mac });
    })
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

  onSubmit() {
    //console.log(this.myForm.value);
    if (this.myForm.valid) {
      let api = 'add_to_blacklist';
      this.lh.addToBlacklist(api, this.myForm.value).subscribe(data => {
        alert(data['message']);
        location.reload();
        this.submitted = true;
      });
    }else if (this.myForm.invalid) {
      this.submitted = false;
    }
  }

  updateMac() {
    if (this.editBlacklistedForm.valid) {
      let api = 'edit_mac/';
      this.lh.editMac(api, this.editBlacklistedId, this.editBlacklistedForm.value).subscribe(data => {
        alert(data['message']);
        this.submitted = true;
        location.reload();
      });
    } else if (this.editBlacklistedForm.invalid) {
      this.submitted = false;
    }
  }
}
