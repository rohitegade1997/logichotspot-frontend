import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogichotspotService } from '../../service/logichotspot.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-create-area',
  templateUrl: './create-area.component.html',
  styleUrls: ['./create-area.component.css']
})
export class CreateAreaComponent implements OnInit {
  bgbtn = "#6d0106";
  countryList: any;
  stateList: any;
  cityList: any;
  countryListArr = [];
  stateListArr = [];
  cityListArr = [];

  myForm: FormGroup;
  city: FormControl;
  state: FormControl;
  country: FormControl;
  areaName: FormControl;

  constructor(private route: Router, private lh: LogichotspotService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getCountryList();
    this.formGroup();
  }

  listArea() {
    this.route.navigate(['areas']);
  }

  //get all countries
  getCountryList() {
    let api = 'get_countries';
    this.lh.getCountries(api).subscribe(data => {
      this.countryList = data;
      this.countryListArr = this.countryList;
      this.stateListArr = [];
      this.cityListArr = [];
    });
  }

  //getting state based on country
  getStateList(countryId) {
    let dataLength: any;
    console.log(countryId);
    let api = 'get_states_per_country/';
    this.lh.getStates(api, countryId).subscribe(data => {
      dataLength = data;
      if (dataLength.length != 0) {
        this.stateList = data;
        this.stateListArr = this.stateList;
        console.log(this.stateList);
      } else {
        this.stateList = [{ 'id': '0', 'state_name': 'None' }]
      }
      this.cityListArr = [];
    });
  }

  //getting city based on state
  getCityList(stateId) {
    let dataLength: any;
    let api = 'get_cities_per_state/';
    this.lh.getCities(api, stateId).subscribe(data => {
      dataLength = data;
      console.log(data);
      if (dataLength.length != 0) {
        this.cityList = data;
        this.cityListArr = this.cityList;
      } else {
        this.cityList = [{ 'id': '0', 'city_name': 'None' }]
      }
    });
  }

  //grouping all form fields
  formGroup() {
    this.myForm = this.fb.group({
      city: [''],
      state: [''],
      country: [''],
      areaName: ['']
    });
  }

  //save new area
  onSubmit() {
    let api = 'add_area';
    this.lh.addnewArea(api, this.myForm.value).subscribe(data =>{
      alert(data['message']);
      this.route.navigate(['areas']);
    });
  }

  //back to area list
  backToList(){
    this.route.navigate(['areas']);
  }
}
