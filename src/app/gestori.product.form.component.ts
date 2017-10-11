import { Inject } from '@angular/core';
import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { URLSearchParams } from "@angular/http";
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

import 'rxjs/add/operator/mergeMap';

export class GestoriProduct {

    constructor(
        public group_id: string,
        public name: string,
        public barcode: string,
        public artic: string,
        public measure: any
    ) {}
}

@Component({
  selector: 'submit-dialog',
  templateUrl: './html/submit-dialog.html',
})

export class SubmitDialog {

    classLink: object;

    constructor(
        public dialogRef: MdDialogRef<SubmitDialog>,
        @Inject(MD_DIALOG_DATA) public data: any
      ) {}

    onNoClick(): void {
        this.dialogRef.close();
    }

    onYesClick(): void {
        this.dialogRef.close();
    }
}

@Component({
    selector: 'gestori-product-form',
    templateUrl: './html/gestori-product-form.html'
})

export class GestoriProductFormComponent {

    model = new GestoriProduct('', '', '', '', 1);
    asyncGroups: Observable<any>;
    selectedMeasure: number;
    pageSize = 10;
    loading: any;
    GroupsControl = new FormControl();
    submitted = false;

    constructor(
        public http: HttpClient, private dialog: MdDialog
    ) {
        this.asyncGroups = this.GroupsControl.valueChanges
            .flatMap(val => this.http.get('http://127.0.0.1:5000/gestori_groups?search='+val));
    }

    measures = [
        {value: 1, viewValue: 'шт.'},
        {value: 2, viewValue: 'кг.'},
        {value: 3, viewValue: 'мл.'}
    ];

    onSubmit() {
        this.openSubmitDialog();
    }

    openSubmitDialog() {
        let dialogRef = this.dialog.open(SubmitDialog, {
          width: '400px',
          data: {
              'group_id': this.model.group_id,
              'name': this.model.name,
              'barcode': this.model.barcode,
              'artic': this.model.artic,
              'measure': this.model.measure
          }
        });
        dialogRef.afterClosed().subscribe(result => {

        });
    }

    clickYes() {
        this.saveProduct(this.model)
    }

    saveProduct(data) {
        this.http.post('http://127.0.0.1:5000/gestori_csv_put', data)
            .subscribe(data => {alert('ok')}, error => {alert('error')})
        this.submitted = true;
    }

}
