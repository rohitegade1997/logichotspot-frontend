import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { NasService } from '../../../service/nas_service/nas.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-nas-list',
  templateUrl: './nas-list.component.html',
  styleUrls: ['./nas-list.component.css']
})
export class NasListComponent implements OnInit {

  bgbtn = "#6d0106";
  dataArr: any;
  displayedColumns = ['nasname', 'shortname', 'type', 'secret', 'server', 'community', 'description', 'edit', 'delete'];
  searchText: String;
  resultLength: any;
  total: number;
  totalpage: any;
  limitFilter: string = '5';
  pageUrl: string;
  startno: any;
  endno: any;
  currentpage: any;
  editNasId: number;
  errorFetch: boolean = false;
  toggleAddModal:boolean=false;

  editNasForm: FormGroup;
  nasname: FormControl;
  shortname: FormControl;
  type: FormControl;
  ports: FormControl;
  secret: FormControl;
  server: FormControl;
  community: FormControl;
  description: FormControl;

  addNasForm: FormGroup;
  nasName: FormControl;
  shortName: FormControl;
  Type: FormControl;
  Ports: FormControl;
  Secret: FormControl;
  Server: FormControl;
  Community: FormControl;
  Description: FormControl;


  constructor(private ns: NasService, private fb: FormBuilder) { }
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit(): void {
    this.getNas();
    this.editNasGroup();
    this.addNasGroup();
  }

  toggleAddBtn(){
    if(this.total < 1){
      console.log(this.total);
      this.toggleAddModal=true;
    }
  }
  getNas() {
    let sendParam = {
      'limit': this.limitFilter
    }
    let api = 'get_nas/';
    this.ns.getNasPage(api, sendParam).subscribe(data => {
      console.log(data);
      this.dataArr = data['data'];
      this.dataArr = new MatTableDataSource<any>(this.dataArr);
      this.dataArr.sort = this.sort;
      this.total = data['total'];
      //console.log(this.total);
      this.pageUrl = data['path'];
      this.totalpage = new Array(data['last_page']);
      this.startno = data['from'];
      this.endno = data['to'];
      this.currentpage = data['current_page'];
      this.toggleAddBtn();
    });
  }

  editNasGroup() {
    this.editNasForm = this.fb.group({
      nasname: [''],
      shortname: [''],
      type: [''],
      ports: [''],
      secret: [''],
      server: [''],
      community: [''],
      description: ['']
    });
  }

  addNasGroup() {
    this.addNasForm = this.fb.group({
      nasName: [''],
      shortName: [''],
      Type: [''],
      Ports: [''],
      Secret: [''],
      Server: [''],
      Community: [''],
      Description: ['']
    });
  }

  editNas(NasId) {
    this.getNasPerId(NasId);
    this.editNasId = NasId;
  }

  deleteNas(NasId) {
    let api = 'delete_nas/'
    this.ns.removeNas(api, NasId).subscribe(data => {
      alert(data['message']);
      location.reload();
      this.toggleAddModal=true;
    });
  }

  nextPage(val) {

  }

  updateNas() {
    //console.log(this.editNasForm.value);
    let api = 'edit_nas/';
    this.ns.updateNasData(api, this.editNasId, this.editNasForm.value).subscribe(data => {
      alert(data['message']);
      location.reload();
    });
  }

  addNewNas() {
    if (this.total == 1) {
      this.errorFetch = true;
    } else {
      let api = 'add_new_nas';
      this.ns.addNewNasData(api, this.addNasForm.value).subscribe(data => {
        alert(data['message']);
        location.reload();
      });
    }
  }

  getNasPerId(NasId) {
    let api = 'get_nas_by_id/';
    this.ns.getNasById(api, NasId).subscribe(data => {
      //console.log(data);
      this.editNasForm.setValue({
        nasname: data[0].nasname,
        shortname: data[0].shortname,
        type: data[0].type,
        ports: data[0].ports,
        secret: data[0].secret,
        server: data[0].server,
        community: data[0].community,
        description: data[0].description
      });
    })
  }

  temp() {
    //this.showHide=true;
    //this.display1='block';
    // if (this.total == 1) {
    //   this.show=false;
    //   alert('You cannot add more than one entry.');
    // } else {
    //   console.log('in a else block');
    //document.getElementById('addNasModal').style. ==display 'block';
    //   this.show = true;
    // }
  }

}
