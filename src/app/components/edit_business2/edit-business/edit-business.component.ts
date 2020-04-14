import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { BusinessService } from '../../../service/business_service/business.service';
import { ActivatedRoute, Router } from '@angular/router';
import { validation } from '../../../config/customValidation';

@Component({
  selector: 'app-edit-business',
  templateUrl: './edit-business.component.html',
  styleUrls: ['./edit-business.component.css']
})
export class EditBusinessComponent implements OnInit {

  id: any = '';
  private sub: any;

  bgbtn = "#6d0106";
  countryList: any;
  stateList: any;
  cityList: any;
  countryListArr = [];
  stateListArr = [];
  cityListArr = [];
  submitted = false;

  editBusinessForm: FormGroup;
  name: FormControl;
  url: FormControl;
  address1: FormControl;
  address2: FormControl;
  city: FormControl;
  state: FormControl;
  country: FormControl;
  zip: FormControl;
  phone: FormControl;

  constructor(private businessService: BusinessService, private fb: FormBuilder, private router: ActivatedRoute, private route: Router) { }

  ngOnInit(): void {
    this.editBusinessFormGroup();
    this.getCountryList();
    this.getBusinessPerId();
  }

  editBusinessFormGroup() {
    this.editBusinessForm = this.fb.group({
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

  //getting all countries
  getCountryList() {
    let api = 'get_countries';
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
    let api = 'get_states_per_country/';
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
    let api = 'get_cities_per_state/';
    this.businessService.getCities(api, stateId).subscribe(data => {
      dataLength = data;
      console.log(data);
      if (dataLength.length != 0) {
        this.cityList = data;
        this.cityListArr = this.cityList;
        console.log(this.cityList);
      } else {
        this.cityList = [{ 'id': '0', 'city_name': 'None' }]
      }
    });
  }

  editBusiness() {
    if (this.editBusinessForm.valid) {
      this.sub = this.router.params.subscribe(params => {
        this.id = params['id'];
      });
      var decodedBusId = atob(this.id);
      let api = 'edit_business/';
      this.businessService.updateBusiness(api, decodedBusId, this.editBusinessForm.value).subscribe(res => {
        alert(res['message']);
        this.route.navigate(['businesses']);
      });
    } else if (this.editBusinessForm.invalid) {
      this.submitted = true;
    }
  }

  getBusinessPerId() {
    this.sub = this.router.params.subscribe(params => {
      this.id = params['id'];
    });
    var decodedBusId = atob(this.id);
    console.log(decodedBusId);
    let api = 'get_business_by_id/';
    this.businessService.getBusinessById(api, decodedBusId).subscribe(data => {
      this.getStateList(data[0].country);
      this.getCityList(data[0].state);
      this.editBusinessForm.setValue({
        name: data[0].name, url: data[0].url, address1: data[0].address1,
        address2: data[0].address2, phone: data[0].phone, city: data[0].city,
        state: data[0].state, country: data[0].country, zip: data[0].zip
      });
    });
  }

  backToList() {
    this.route.navigate(['businesses']);
  }
}
