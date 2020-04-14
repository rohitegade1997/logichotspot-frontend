import { Component, OnInit } from '@angular/core';
import { LogichotspotService } from '../../service/logichotspot.service';
import { tick } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { Subscriber } from 'rxjs';

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.css']
})
export class EditListComponent implements OnInit {
  dataArr: any;
  //title: string;

  constructor(private lh: LogichotspotService) { }

  ngOnInit(): void {
    this.lh.getAreas().subscribe(res => {
      this.dataArr = res;
    });
    // this.lh.editList().subscribe(res => {
    //   for (var i = 0; i < 4; i++) {
    //     var tableId = document.getElementById('list');
    //     tableId.append(res[i].title);
    //   }
    // });
  }

  // edit(e) {
  //   e.preventDefault();
  //   this.lh.editList(this.title).subscribe((data) => {
  //     console.log("hm" + data);
  //   });
  // }

  editData() {
    console.log('hello');
  }
}
