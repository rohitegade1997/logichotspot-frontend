import { Injectable } from '@angular/core';
import { Http, Request, RequestMethod, RequestOptions, Headers, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NasService {
  baseURL: string = 'http://localhost:8000/api/';
  headers: Headers = new Headers;
  options: any;

  constructor(private http: HttpClient) {
    this.headers.append('enctype', 'multipart/form-data');
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('X-Requested-With', 'XMLHttpRequest');

    this.options = new RequestOptions({ headers: this.headers });
  }
  getNasPage(api, sendParam) {

    return this.http.post(this.baseURL + api, sendParam);
  }
  getNasById(api, NasId) {
    return this.http.get(this.baseURL + api + NasId);
  }
  updateNasData(api, nasId, postData) {
    return this.http.post(this.baseURL + api + nasId, postData);
  }
  addNewNasData(api,postData){
    console.log(postData);
    return this.http.post(this.baseURL + api, postData);
  }
  removeNas(api, nasId) {
    return this.http.post(this.baseURL + api + nasId, '');
  }
}
