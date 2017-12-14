import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'hammerjs';

import { AppComponent, DialogOverviewExampleDialogComponent } from './app.component';
import { MatInputModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material';
import { MatMenuModule } from '@angular/material';
import { MatSidenavModule } from '@angular/material';
import { MatListModule } from '@angular/material';
import { MatAutocompleteModule } from '@angular/material';
import { MatSelectModule } from '@angular/material';
import { MatTableModule } from '@angular/material';
import { MatCheckboxModule } from '@angular/material';
import { MatSnackBarModule } from '@angular/material';
import { MatDialogModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatSlideToggleModule } from '@angular/material';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';

import { GestoriProductFormComponent, SubmitDialog } from './gestori.product.form.component';
import { MatchListComponent, MatchProductFormComponent, MatchDialogComponent, WarnDialogComponent } from './match.product.form.component';
import { MatchService } from './match.service';
import { GlobalService } from './global.service';
import { BaseRequestOptions, Headers } from '@angular/http';
import { RequestOptions } from '@angular/http';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressBarModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';



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
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    MatAutocompleteModule,
    MatSelectModule,
    HttpClientModule,
    MatTableModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    NgxPaginationModule,
    MatSlideToggleModule,
    MatProgressBarModule,
    MatExpansionModule,
    MatChipsModule,
    MatTabsModule
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
