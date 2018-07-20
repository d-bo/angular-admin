import { Component, Input, Output, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatProgressBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PageEvent } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { MatAutocomplete } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { PaginationInstance } from 'ngx-pagination/dist/ngx-pagination.module';
import { EventEmitter } from '@angular/core';
import { GlobalService } from './service/global.service';
import { DialogOverviewExampleDialogComponent } from './dialog.overview.example.dialog.component';

import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/mergeMap';

import _ from 'lodash';



interface IServerResponse {
  data: any;
  count: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './html/app.component.html',
  styleUrls: [
      './css/bootstrap-grid.css',
    ],
  //changeDetection: ChangeDetectionStrategy.OnPush
})

export class AppComponent {

  folders = [
    {
      name: 'Photos',
      updated: new Date('1/1/16'),
    },
    {
      name: 'Recipes',
      updated: new Date('1/17/16'),
    },
    {
      name: 'Work',
      updated: new Date('1/28/16'),
    }
  ];

  notes = [
    {
      name: 'Vacation Itinerary',
      updated: new Date('2/20/16'),
    },
    {
      name: 'Kitchen Remodel',
      updated: new Date('1/18/16'),
    }
  ];

  foods = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];
}