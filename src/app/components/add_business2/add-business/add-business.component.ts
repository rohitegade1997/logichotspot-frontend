import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BusinessService } from '../../../service/business_service/business.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { validation } from '../../../config/customValidation';

@Component({
  selector: 'app-add-business',
  templateUrl: './add-business.component.html',
  styleUrls: ['./add-business.component.css']
})
export class AddBusinessComponent implements OnInit {
  bgbtn = "#6d0106";
  countryList: any;
  stateList: any;
  cityList: any;
  submitted = false;
  countryListArr = [];
  stateListArr = [];
  cityListArr = [];

  myForm: FormGroup;

  name: FormControl;
  url: FormControl;
  address1: FormControl;
  address2: FormControl;
  city: FormControl;
  state: FormControl;
  country: FormControl;
  zip: FormControl;
  phone: FormControl;

  constructor(private route: Router, private businessService: BusinessService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.addBusinessFormGroup();
    this.getCountryList()
  }

  addBusinessFormGroup() {
    this.myForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(validation.name)]],
      url: ['', [Validators.required, Validators.pattern(validation.url)]],
      address1: ['', [Validators.required, Validators.pattern(validation.AllReg)]],
      address2: [''],
      country: ['', [Validators.required]],
      state: ['', [Validators.required]],
      city: ['', [Validators.required]],
      zip: ['', [Validators.required, Validators.pattern(validation.zip)]],
      phone: ['', [Validators.required, Validators.pattern(validation.phone)]]

    });
  }
  backToList() {
    this.route.navigate(['businesses']);
  }
  addBusiness() {
    if (this.myForm.valid) {
      let api = 'add_new_business';
      this.businessService.addnewBusiness(api, this.myForm.value).subscribe(data => {
        alert(data['message']);
        this.route.navigate(['businesses']);
      });
    } else if (this.myForm.invalid) {
      this.submitted = true;
    }
  }

  //getting all countries
  getCountryList() {
    let api = 'get_business_countries';
    this.businessService.getCountries(api).subscribe(data => {
      console.log(data);
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
    let api = 'get_business_states_per_country/';
    this.businessService.getStates(api, countryId).subscribe(data => {
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
    let api = 'get_business_cities_per_state/';
    this.businessService.getCities(api, stateId).subscribe(data => {
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


}
