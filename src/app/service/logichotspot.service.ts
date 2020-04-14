import { Injectable, APP_ID } from '@angular/core';
import { Http, Request, RequestMethod, RequestOptions, Headers, Response } from '@angular/http';
import { EditList } from '../EditList';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LogichotspotService {

  baseURL: string = 'http://localhost:8000/api/';
  headers: Headers = new Headers;
  options: any;

  constructor(private http: HttpClient) {
    this.headers.append('enctype', 'multipart/form-data');
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('X-Requested-With', 'XMLHttpRequest');

    this.options = new RequestOptions({ headers: this.headers });
  }

  //get all areas
  getAreas() {
    return this.http.get('http://localhost:8000/api/get_areas');
  }

  //update area
  updateArea(id, data) {
    var strfy = JSON.stringify(data);
    console.log(strfy);
    var jsonObj = JSON.parse(strfy);
    console.log(jsonObj);
    return this.http.post('http://localhost:8000/api/edit_area/' + id, jsonObj);
  }

  //get area per id
  getAreaById(id) {
    return this.http.get('http://localhost:8000/api/get_area_by_id/' + id);
  }

  //delete area
  removeArea(id) {
    return this.http.post('http://localhost:8000/api/delete_area/' + id, '');
  }

  //toggle status
  updateToggleStatus(id, status) {
    if (status == 1) {
      var statusStr = '{"active":1}';
    }
    if (status == 0) {
      var statusStr = '{"active":0}';
    }
    var jsonObj = JSON.parse(statusStr);
    console.log(jsonObj);
    return this.http.post('http://localhost:8000/api/change_status/' + id, jsonObj);
  }

  searchAreaInDb(keyword) {
    return this.http.post('http://localhost:8000/api/search_area/' + keyword, '');
  }

  serverPagination(api, postData) {
    return this.http.post(api, postData);
  }

  getLimitAreas(api, postData) {
    return this.http.post(this.baseURL + api, postData);
  }

  getCountries(api) {
    return this.http.get(this.baseURL + api);
  }

  getStates(api, countryId) {
    return this.http.get(this.baseURL + api + countryId);
  }

  getCities(api, stateId) {
    return this.http.get(this.baseURL + api + stateId);
  }

  addnewArea(api, formData) {
    return this.http.post(this.baseURL + api, formData);
  }

  getBlacklistData(api, postData) {
    return this.http.post(this.baseURL + api, postData);
  }

  searchBlacklistedPlace(keyword) {
    return this.http.get('http://localhost:8000/api/search_blacklisted_place/' + keyword);
  }

  getPlaces(api) {
    return this.http.get(this.baseURL + api);
  }
  addToBlacklist(api, postData) {
    return this.http.post(this.baseURL + api, postData);
  }
  getBlacklistedById(Id, api) {
    return this.http.get(this.baseURL + api + Id);
  }
  editMac(api, id, postData) {
    return this.http.post(this.baseURL + api + id, postData)
  }
  removeBlacklisted(api,id){
    return this.http.post(this.baseURL+api+id,'');                          
  }
}
