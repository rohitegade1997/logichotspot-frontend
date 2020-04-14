import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RequestOptions,Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  baseURL: string = 'http://localhost:8000/api/';
  headers: Headers = new Headers;
  options: any;

  constructor(private http: HttpClient) {
    this.headers.append('enctype', 'multipart/form-data');
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('X-Requested-With', 'XMLHttpRequest');

    this.options = new RequestOptions({ headers: this.headers });
  }
  getCityData(api, postData) {
    return this.http.post(this.baseURL + api, postData);
  }

  searchCityInDb(api, keyword) {
    return this.http.post(this.baseURL + api + keyword, '');
  }

  //toggle status
  updateToggleStatus(api, id, jsonObj) {
    return this.http.post(this.baseURL + api + id, jsonObj);
  }

  serverPagination(api, postData) {
    return this.http.post(api, postData);
  }
}
