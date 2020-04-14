import { Injectable } from '@angular/core';
import { Http, Request, RequestMethod, RequestOptions, Headers, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { identifierModuleUrl } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  baseURL: string = 'http://localhost:8000/api/';
  headers: Headers = new Headers;
  options: any;

  constructor(private http: HttpClient) {
    this.headers.append('enctype', 'multipart/form-data');
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('X-Requested-With', 'XMLHttpRequest');

    this.options = new RequestOptions({ headers: this.headers });
  }
  getBusinessData(api, postData) {
    return this.http.post(this.baseURL + api, postData);
  }

  serverPagination(api, postData) {
    return this.http.post(api, postData);
  }

  getCountries(api) {
    console.log(api);
    return this.http.get(this.baseURL + api);
  }

  getStates(api, countryName) {
    return this.http.get(this.baseURL + api + countryName);
  }

  getCities(api, stateId) {
    return this.http.get(this.baseURL + api + stateId);
  }

  addnewBusiness(api, formData) {
    return this.http.post(this.baseURL + api, formData);
  }

  getBusinessById(api, busId) {
    return this.http.get(this.baseURL + api + busId);
  }

  updateBusiness(api, busId, formData) {
    return this.http.post(this.baseURL + api + busId, formData);
  }

  //toggle status
  updateToggleStatus(api, id, jsonObj) {
    return this.http.post(this.baseURL + api + id, jsonObj);
  }

  //remove business
  removeBusiness(api, busId) {
    return this.http.post(this.baseURL + api + busId, '');
  }

  searchBusinessInDb(api, keyword) {
    return this.http.post(this.baseURL + api + keyword, '');
  }
}
