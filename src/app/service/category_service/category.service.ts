import { Injectable } from '@angular/core';
import { Http, Request, RequestMethod, RequestOptions, Headers, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  baseURL: string = 'http://localhost:8000/api/';
  headers: Headers = new Headers;
  options: any;

  constructor(private http: HttpClient) {
    this.headers.append('enctype', 'multipart/form-data');
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('X-Requested-With', 'XMLHttpRequest');

    this.options = new RequestOptions({ headers: this.headers });
  }

  getCategories(api, postData) {
    return this.http.post(this.baseURL + api, postData);
  }

  serverPagination(api, postData) {
    return this.http.post(api, postData);
  }

  searchCategory(api, keyword) {
    return this.http.get(this.baseURL + api + keyword);
  }

  //toggle status
  updateToggleStatus(api, catId, status) {
    if (status == 1) {
      var statusStr = '{"active":1}';
    }
    if (status == 0) {
      var statusStr = '{"active":0}';
    }
    var jsonObj = JSON.parse(statusStr);
    console.log(jsonObj);
    return this.http.post(this.baseURL + api + catId, jsonObj);
  }

  removeCategory(api, catId) {
    return this.http.post(this.baseURL + api + catId, '');
  }

  updateCatData(api, catId, postData) {
    return this.http.post(this.baseURL + api + catId, postData);
  }

  getCategoryById(api, catId) {
    return this.http.get(this.baseURL + api + catId);
  }

  addNewCategoryData(api, postData) {
    return this.http.post(this.baseURL + api, postData);
  }
}
