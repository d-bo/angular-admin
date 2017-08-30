//import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {MaterialModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import 'hammerjs';

import { AppComponent } from './app.component';
import {MdInputModule} from '@angular/material';
import {MdButtonModule} from '@angular/material';
import {MdToolbarModule} from '@angular/material';
import {MdMenuModule} from '@angular/material';
import {MdSidenavModule} from '@angular/material';
import {MdListModule} from '@angular/material';
import {MdAutocompleteModule} from '@angular/material';
import {MdSelectModule} from '@angular/material';
import {MdTableModule} from '@angular/material';
import {MdCheckboxModule} from '@angular/material';
import {MdSnackBarModule} from '@angular/material';
import {MdDialogModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MdPaginatorModule} from '@angular/material';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    MaterialModule,
    BrowserAnimationsModule,
    MdInputModule,
    MdButtonModule,
    MdToolbarModule,
    MdMenuModule,
    MdSidenavModule,
    MdListModule,
    MdAutocompleteModule,
    MdSelectModule,
    HttpClientModule,
    MdTableModule,
    MdCheckboxModule,
    MdSnackBarModule,
    MdDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MdPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
