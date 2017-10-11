//import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import 'hammerjs';

import { AppComponent, DialogOverviewExampleDialog } from './app.component';
import { MdInputModule } from '@angular/material';
import { MdButtonModule } from '@angular/material';
import { MdToolbarModule } from '@angular/material';
import { MdMenuModule } from '@angular/material';
import { MdSidenavModule } from '@angular/material';
import { MdListModule } from '@angular/material';
import { MdAutocompleteModule } from '@angular/material';
import { MdSelectModule } from '@angular/material';
import { MdTableModule } from '@angular/material';
import { MdCheckboxModule } from '@angular/material';
import { MdSnackBarModule } from '@angular/material';
import { MdDialogModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdPaginatorModule } from '@angular/material';
import { NgxPaginationModule } from 'ngx-pagination';
import { MdSlideToggleModule } from '@angular/material';

import { GestoriProductFormComponent, SubmitDialog } from './gestori.product.form.component';
import { MatchProductFormComponent, MatchDialog } from './match.product.form.component';



@NgModule({
  declarations: [
    AppComponent,
    DialogOverviewExampleDialog,
    GestoriProductFormComponent,
    MatchProductFormComponent,
    SubmitDialog,
    MatchDialog
  ],
  entryComponents: [
    DialogOverviewExampleDialog,
    SubmitDialog,
    MatchDialog
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
    MdPaginatorModule,
    NgxPaginationModule,
    MdSlideToggleModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
