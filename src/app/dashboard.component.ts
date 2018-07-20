import { Component, Input, Output, OnInit } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { PageEvent } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { MatProgressBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { GlobalService } from './service/global.service';
import { DialogOverviewExampleDialogComponent } from './dialog.overview.example.dialog.component';



@Component({
  selector: 'app-root',
  templateUrl: './html/dashboard.component.html',
  styleUrls: [
	  	'./css/bootstrap-reboot.css',
	  	'./css/bootstrap-grid.css',
  	],
})

export class DashboardComponent implements OnInit {
  p = 1;
  total: number;
  loading: any;

  @Input('data') brands: any;
  all_brands: any;
  length: any;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 100];

  @Output() pageChange: EventEmitter<number>;

  pageEvent: PageEvent;

  myCompleteControl = new FormControl();
  filteredOptions: Observable<any>;
  asyncBrands: Observable<any>;

  gestori: any;
  letu: any;
  ilde: any;
  brands_gestori: any;
  brands_gestori_data: any;
  brands_gestori_count: any;
  brands_letu: any;
  selected: any;

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

  filter(val: string): any {
    return this.http.get('http://127.0.0.1:5000/all_brands?search=' + val);
  }

  constructor(
    private http: HttpClient, public dialog: MatDialog,
    public snackBar: MatSnackBar, private sanitizer: DomSanitizer,
    private globals: GlobalService
  ) {}

  ngOnInit(): void {
    this.ping();
  }

  saveBrand(id, value): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
      width: '400px',
      data: { 'id': id, 'value': value }
    });

    /*
    dialogRef.afterClosed().subscribe(result => {

    });
    */
  }

  selectedItem(event) {
    alert('EVENT: ' + event);
    return event;
  }

  ping() {
    this.globals.get(this.globals.MAIN_IP + '/v1/ping?_p=0').subscribe(data => {
      // pass
    }, err => {
      console.log(err.message);
      this.snackBar.open(
        "cant\'t load API "+this.globals.MAIN_IP+"/v1/ping - " + err.message,
        'OK'
      );
    });
  }
}
