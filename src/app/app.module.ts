import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import 'hammerjs';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select/';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material';

import { MatTooltipModule } from '@angular/material/tooltip';
import { BaseRequestOptions, Headers } from '@angular/http';
import { RequestOptions } from '@angular/http';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressBarModule } from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatPaginatorModule } from '@angular/material/paginator';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './404.component';
import { MatchService } from './service/match.service';
import { GlobalService } from './service/global.service';
import { MatchListComponent } from './match.list.component';
import { ConfirmDialogComponent } from './confirm.dialog.component';
import { SigninComponent } from './signin.component';
import { LoaderComponent } from './loader.component';
import { DashboardComponent } from './dashboard.component';
import { WarnDialogComponent } from './warn.dialog.component';
import { GestoriProductFormComponent, SubmitDialog } from './gestori.product.form.component';
import { MatchProductFormComponent } from './match.product.form.component';
import { MatchDialogComponent } from './match.dialog.component'
import { DialogOverviewExampleDialogComponent } from './dialog.overview.example.dialog.component';

const appRoutes: Routes = [
  { path: '', component: AppComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '**', component: PageNotFoundComponent }
];



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
    SigninComponent,
    LoaderComponent,
    DashboardComponent,
    PageNotFoundComponent,
    DialogOverviewExampleDialogComponent,
    GestoriProductFormComponent,
    MatchProductFormComponent,
    SubmitDialog,
    MatchDialogComponent,
    WarnDialogComponent,
    ConfirmDialogComponent,
    MatchListComponent
  ],
  entryComponents: [
    DialogOverviewExampleDialogComponent,
    SubmitDialog,
    MatchDialogComponent,
    WarnDialogComponent,
    ConfirmDialogComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    ),
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
    NgxPaginationModule,
    MatSlideToggleModule,
    MatProgressBarModule,
    MatExpansionModule,
    MatChipsModule,
    MatTabsModule,
    MatIconModule,
    MatCardModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonToggleModule,
    MatPaginatorModule
  ],
  providers: [
    GlobalService,
    MatchService,
    MatchListComponent,
    ConfirmDialogComponent,
    WarnDialogComponent,
    {provide: RequestOptions, useClass: CustomRequestOptions}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}