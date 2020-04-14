import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from '../../../service/category_service/category.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit {

  bgbtn = "#6d0106";
  dataArr: any;
  displayedColumns = ['title', 'active', 'edit', 'delete'];
  searchText: String;
  resultLength: any;
  total: number;
  totalpage: any;
  limitFilter: string = '5';
  pageUrl: string;
  startno: any;
  endno: any;
  currentpage: any;
  editCatId: number;

  editCategoryForm: FormGroup;
  title: FormControl;

  addCategoryForm: FormGroup;
  category: FormControl;

  constructor(private cs: CategoryService, private fb: FormBuilder) { }

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit(): void {
    this.getCategories();
    this.editCategoryGroup();
    this.addCategoryGroup();
  }

  addCategoryGroup() {
    this.addCategoryForm = this.fb.group({
      category: ['']
    });
  }

  editCategoryGroup() {
    this.editCategoryForm = this.fb.group({
      title: ['']
    });
  }

  getCategories() {
    let sendParam = {
      'limit': this.limitFilter
    }
    let api = 'get_categories/';
    this.cs.getCategories(api, sendParam).subscribe(data => {
      console.log(data);
      this.dataArr = data['data'];
      this.dataArr = new MatTableDataSource<any>(this.dataArr);
      this.dataArr.sort = this.sort;
      this.total = data['total'];
      this.pageUrl = data['path'];
      this.totalpage = new Array(data['last_page']);
      this.startno = data['from'];
      this.endno = data['to'];
      this.currentpage = data['current_page'];
    });
  }

  addNewCategory() {
    let api = 'add_new_category';
    this.cs.addNewCategoryData(api, this.addCategoryForm.value).subscribe(data => {
      alert(data['message']);
      location.reload();
    });
  }

  searchCategory() {
    let api = 'search_category/';

    if (this.searchText == " ") {
      return false;
    } else {
      this.cs.searchCategory(api, this.searchText).subscribe(result => {
        this.dataArr = "";
        this.dataArr = result;
        this.dataArr = new MatTableDataSource<any>(this.dataArr);
        this.dataArr.sort = this.sort;
      });
    }
  }

  changeStatus(catId, status) {
    let api = 'change_cat_status/';
    this.cs.updateToggleStatus(api, catId, status).subscribe(res => {
    });
  }

  editCategory(catId) {
    this.getCategoryPerId(catId);
    this.editCatId = catId;
  }

  getCategoryPerId(catId) {
    let api = 'get_category_by_id/';
    this.cs.getCategoryById(api, catId).subscribe(data => {
      this.editCategoryForm.setValue({ title: data[0].title });
    })
  }

  updateCategory() {
    let api = 'edit_category/';
    this.cs.updateCatData(api, this.editCatId, this.editCategoryForm.value).subscribe(data => {
      alert(data['message']);
      location.reload();
    });
  }

  deleteCategory(catId) {
    let api = 'delete_category/'
    this.cs.removeCategory(api, catId).subscribe(data => {
      alert(data['message']);
      location.reload();
    });
  }

  applyLimit(val) {
    this.limitFilter = val;
    this.getCategories();
  }

  nextPage(pageNo) {
    let sendParam = {
      'limit': this.limitFilter
    }
    this.cs.serverPagination(this.pageUrl + '?page=' + pageNo, sendParam).subscribe(data => {
      this.dataArr = "";
      this.dataArr = data['data'];
      this.dataArr = new MatTableDataSource<any>(this.dataArr);
      this.dataArr.sort = this.sort;
      this.total = data['total'];
      this.pageUrl = data['path'];
      this.totalpage = new Array(data['last_page']);
      this.startno = data['from'];
      this.endno = data['to'];
      this.currentpage = data['current_page'];
    });
  }
}
