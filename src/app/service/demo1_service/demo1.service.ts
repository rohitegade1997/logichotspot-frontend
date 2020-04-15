import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RequestOptions,Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class Demo1Service {

  baseURL: string = 'http://localhost:8000/api/';
  headers: Headers = new Headers;
  options: any;

  constructor(private http: HttpClient) {
    this.headers.append('enctype', 'multipart/form-data');
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('X-Requested-With', 'XMLHttpRequest');

    this.options = new RequestOptions({ headers: this.headers });
  }

  getDemoData(api, postData) {
    return this.http.post(this.baseURL + api, postData);
  }
  searchNameInDb(api, keyword) {
    return this.http.post(this.baseURL + api + keyword, '');
  }
  addNewRecordData(api, postData) {
    return this.http.post(this.baseURL + api, postData);
  }
  serverPagination(api, postData) {
    return this.http.post(api, postData);
  }
}
