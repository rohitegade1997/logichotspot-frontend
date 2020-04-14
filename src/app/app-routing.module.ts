import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { EditListComponent } from './components/edit-list/edit-list.component';
import { ListAreaComponent } from './components/list-area/list-area.component';
import { EditAreaComponent } from './components/edit-area/edit-area.component';
import { CreateAreaComponent } from './components/create-area/create-area.component';
import { BlackListComponent } from './components/blacklist/black-list/black-list.component';
import { CategoriesListComponent } from './components/categories/categories-list/categories-list.component';
import { NasListComponent } from './components/nas/nas-list/nas-list.component';
import { BusinessListComponent } from './components/business2/business-list/business-list.component';
import { AddBusinessComponent } from './components/add_business2/add-business/add-business.component';
import { EditBusinessComponent } from './components/edit_business2/edit-business/edit-business.component';
import { CountryListComponent } from './components/countries/country-list/country-list.component';
import { StateListComponent } from './components/states/state-list/state-list.component';
import { CityListComponent } from './components/cities/city-list/city-list.component';
import { Demo1ListComponent } from './components/demo1/demo1-list/demo1-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'areas', pathMatch: 'full' },
  { path: 'areas', component: ListAreaComponent },
  { path: 'edit', component: EditListComponent },
  { path: 'edit_area/:id', component: EditAreaComponent },
  { path: 'create_area', component: CreateAreaComponent },
  { path: 'blacklists', component: BlackListComponent },
  { path: 'categories', component: CategoriesListComponent },
  { path: 'nas', component: NasListComponent },
  { path: 'businesses', component: BusinessListComponent },
  { path: 'add_business', component: AddBusinessComponent },
  { path: 'edit_business/:id', component: EditBusinessComponent },
  { path: 'countries', component: CountryListComponent },
  { path: 'states', component: StateListComponent },
  { path: 'cities', component: CityListComponent },
  { path: 'demo1', component: Demo1ListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
