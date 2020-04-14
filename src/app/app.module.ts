import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DemoMaterialModule } from './material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ListComponent } from './components/list/list.component';
import { EditListComponent } from './components/edit-list/edit-list.component';

import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { ListAreaComponent } from './components/list-area/list-area.component';
import { EditAreaComponent } from './components/edit-area/edit-area.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ListComponent,
    EditListComponent,
    ListAreaComponent,
    EditAreaComponent,
    CreateAreaComponent,
    BlackListComponent,
    CategoriesListComponent,
    NasListComponent,
    BusinessListComponent,
    AddBusinessComponent,
    EditBusinessComponent,
    CountryListComponent,
    StateListComponent,
    CityListComponent,
    Demo1ListComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    DemoMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
