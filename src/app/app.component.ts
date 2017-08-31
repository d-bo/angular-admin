import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Injectable } from '@angular/core';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MdDialog, MdDialogRef } from '@angular/material';
import { PageEvent } from '@angular/material';
import { MdSnackBar } from '@angular/material';

import { DataSource } from '@angular/cdk';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import _ from 'lodash';

@Component({
  selector: 'dialog-result-example-dialog',
  template: 'Hello, i am dialog',
})
export class DialogResultExampleDialog {
  constructor(public dialogRef: MdDialogRef<DialogResultExampleDialog>) {}
}

@Component({
  selector: 'app-root',
  templateUrl: './html/app.component.html',
  styleUrls: ['./css/app.component.css'],
})

export class AppComponent implements OnInit {

  length: any;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 100];

  pageEvent: PageEvent;

  myControl = new FormControl();
  filteredOptions: Observable<string[]>;

  filter(val: string): string[] {
     return this.brands_letu.filter(option => new RegExp(`^${val}`, 'gi').test(option));
  }

  gestori: any;
  letu: any;
  ilde: any;
  brands_gestori: any;
  brands_letu: any;

  constructor(private http: HttpClient, public dialog: MdDialog) {}

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

  ngOnInit(): void {
    this.http.get('http://127.0.0.1:5000/gestori').subscribe(data => {
      this.gestori = data;
    }, err => {
      //this.snackBar('Error read http://127.0.0.1:5000/gestori')
    });
    this.http.get('http://127.0.0.1:5000/letu').subscribe(data => {
      this.letu = data;
    });
    this.http.get('http://127.0.0.1:5000/ilde').subscribe(data => {
      this.ilde = data;
    });
    this.http.get('http://127.0.0.1:5000/brands_gestori').subscribe(data => {
      this.brands_gestori = data;
    });
    this.http.get('http://127.0.0.1:5000/brands_letu').subscribe(data => {
      this.brands_letu = data;
      console.log(_.size(data));
      this.length = _.size(data);
      this.filteredOptions = this.myControl.valueChanges
         .startWith(null)
         .map(val => val ? this.filter(val) : this.brands_letu.slice());
    });
  }

}
