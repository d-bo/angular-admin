import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'hammerjs';

import { AppComponent, DialogOverviewExampleDialogComponent } from './app.component';
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
import { MatchListComponent, MatchProductFormComponent, MatchDialogComponent, WarnDialogComponent } from './match.product.form.component';
import { MatchService } from './match.service';
import { GlobalService } from './global.service';
import { BaseRequestOptions, Headers } from '@angular/http';
import { RequestOptions } from '@angular/http';
import { MdExpansionModule } from '@angular/material';
import { MdProgressBarModule } from '@angular/material';



@Injectable()
export class CustomRequestOptions extends BaseRequestOptions {
    headers = new Headers({
        'Cache-Control': 'no-store, no-cache, no-transform, must-revalidate, max-age=0',
        'Pragma': 'no-cache',
        'Expires': 'Sat, 01 Jan 2000 00:00:00 GMT'
    });
}

@NgModule({
  declarations: [
    AppComponent,
    DialogOverviewExampleDialogComponent,
    GestoriProductFormComponent,
    MatchProductFormComponent,
    SubmitDialog,
    MatchDialogComponent,
    WarnDialogComponent,
    MatchListComponent
  ],
  entryComponents: [
    DialogOverviewExampleDialogComponent,
    SubmitDialog,
    MatchDialogComponent,
    WarnDialogComponent
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
    MdProgressBarModule
  ],
  providers: [
    GlobalService,
    MatchService,
    MatchListComponent,
    {provide: RequestOptions, useClass: CustomRequestOptions}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
