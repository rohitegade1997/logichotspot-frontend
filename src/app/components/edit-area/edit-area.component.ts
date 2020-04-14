import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Edit_Area } from './edit_area.model';
//import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { LogichotspotService } from '../../service/logichotspot.service';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
@Component({
  selector: 'app-edit-area',
  templateUrl: './edit-area.component.html',
  styleUrls: ['./edit-area.component.css']
})
export class EditAreaComponent implements OnInit {

  // myForm: FormGroup;
  // areaName: FormControl;
  //areaName:string;
  title:any;
  edit_area = new Edit_Area();

  id: any = '';
  private sub: any;

  constructor(private router: ActivatedRoute, private lh: LogichotspotService, private route: Router) { }

  ngOnInit(): void {
    this.getAreaPerId();
  }

  //update area
  editArea(e) {
    e.preventDefault();
    this.sub = this.router.params.subscribe(params => {
      this.id = params['id'];
    });
    var decodedAreaId = atob(this.id);
    this.lh.updateArea(decodedAreaId, this.edit_area).subscribe(res => {
      //console.log(res);
      alert(res['message']);
      this.route.navigate(['areas']);
    });
  }

  //get area per id
  getAreaPerId() {
    this.sub = this.router.params.subscribe(params => {
      this.id = params['id'];
    });
    var decodedAreaId = atob(this.id);
    this.lh.getAreaById(decodedAreaId).subscribe(result => {
      this.edit_area.title = result[0].title;
      //console.log(this.edit_area.title);
    });
  }

  //back to area list
  backToList(){
    this.route.navigate(['areas']);
  }
}
