import { Inject } from '@angular/core';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { URLSearchParams } from "@angular/http";
import { MdSnackBar } from '@angular/material';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/mergeMap';

import _ from 'lodash';

@Component({
  selector: 'match-dialog',
  templateUrl: './html/match-dialog.html',
})

export class MatchDialog {

    constructor(
            public dialogRefMatch: MdDialogRef<MatchDialog>,
            @Inject(MD_DIALOG_DATA) public data: any
        ) {}

    onNoClick(): void {
      this.dialogRefMatch.close();
    }

    onYesClick(): void {
        this.dialogRefMatch.close();
    }
}

@Component({
    selector: 'match-product-form',
    templateUrl: './html/match-product-form.html'
})

export class MatchProductFormComponent implements OnInit {

    // observables
    asyncGestoriProducts: Observable<any>;
    asyncLetuProducts: Observable<any>;
    asyncIldeProducts: Observable<any>;
    asyncRiveProducts: Observable<any>;

    filteredMatchOptions: Observable<any>;
    filteredLetuMatchOptions: Observable<any>;
    filteredRiveMatchOptions: Observable<any>;
    filteredIldeMatchOptions: Observable<any>;

    filteredTxtMatchOptions: Observable<any>;
    filteredTxtLetuMatchOptions: Observable<any>;
    filteredTxtRiveMatchOptions: Observable<any>;
    filteredTxtIldeMatchOptions: Observable<any>;

    asyncFulltextSearchGest: Observable<any>;
    asyncFulltextSearchLetu: Observable<any>;
    asyncFulltextSearchIlde: Observable<any>;
    asyncFulltextSearchRive: Observable<any>;

    p: any;
    p1: any;
    p2: any;
    p3: any;
    p4: any;
    pageSize = 7;
    totalMatch: number;
    totalMatch1: number;
    totalMatch2: number;
    totalMatch3: number;
    totalMatch4: number;

    myCompleteMatchControl = new FormControl();
    myCompleteLetuMatchControl = new FormControl();
    myCompleteIldeMatchControl = new FormControl();
    myCompleteRiveMatchControl = new FormControl();

    myCompleteGestFullTxtControl = new FormControl();
    myCompleteLetuFullTxtControl = new FormControl();
    myCompleteIldeFullTxtControl = new FormControl();
    myCompleteRiveFullTxtControl = new FormControl();

    gestoriSelectedBrand: any;
    riveSelectedBrand: any;
    letuSelectedBrand: any;
    ildeSelectedBrand: any;

    gestSelectedItem: any;
    riveSelectedItem: any;
    letuSelectedItem: any;
    ildeSelectedItem: any;



    constructor(
        private http: HttpClient,
        private mdialog: MdDialog,
        private snackBar: MdSnackBar
    ) {

        this.http = http
        this.mdialog = mdialog
        this.snackBar = snackBar



        // autocomplete BRAND search
        this.filteredMatchOptions = this.myCompleteMatchControl.valueChanges
            .flatMap(val => this.http.get('http://127.0.0.1:5000/brands?s='+val+'&p=gest'));

        this.filteredLetuMatchOptions = this.myCompleteLetuMatchControl.valueChanges
            .flatMap(val => this.http.get('http://127.0.0.1:5000/brands?s='+val+'&p=letu'));

        this.filteredIldeMatchOptions = this.myCompleteIldeMatchControl.valueChanges
            .flatMap(val => this.http.get('http://127.0.0.1:5000/brands?s='+val+'&p=ilde'));

        this.filteredRiveMatchOptions = this.myCompleteRiveMatchControl.valueChanges
            .flatMap(val => this.http.get('http://127.0.0.1:5000/brands?s='+val+'&p=rive'));



        // autocomplete product search
        this.filteredTxtMatchOptions = this.myCompleteMatchControl.valueChanges
            .flatMap(val => this.http.get('http://127.0.0.1:5000/ft?s='+val+'&p=gest'));

        this.filteredTxtLetuMatchOptions = this.myCompleteLetuMatchControl.valueChanges
            .flatMap(val => this.http.get('http://127.0.0.1:5000/ft?s='+val+'&p=letu'));

        this.filteredTxtIldeMatchOptions = this.myCompleteIldeMatchControl.valueChanges
            .flatMap(val => this.http.get('http://127.0.0.1:5000/ft?s='+val+'&p=ilde'));

        this.filteredTxtRiveMatchOptions = this.myCompleteRiveMatchControl.valueChanges
            .flatMap(val => this.http.get('http://127.0.0.1:5000/ft?s='+val+'&p=rive'));
    }

    ngOnInit(): void {
        this.getPageGestori(1)
        this.getPageLetu(1)
        this.getPageIlde(1)
        this.getPageRive(1)
    }

    markGestori(item_obj) {
        console.log(item_obj);
        let el = document.getElementById('gest_'+item_obj.artic);
        let attribute = el.getAttribute('gmarked');
        if (attribute == 'yes') {
            el.style.borderLeft = '';
            //el.setAttribute('class', 'selected-item-before');
            el.setAttribute('gmarked', 'no');
            this.gestSelectedItem = null;
        } else {
            el.style.borderLeft = "14px solid rgb(33, 153, 232)";
            //el.setAttribute('class', 'selected-item-after');
            el.setAttribute('gmarked', 'yes');
            this.gestSelectedItem = item_obj;
        }
    }

    markRive(item_obj) {
        console.log(item_obj)
        let el = document.getElementById('rive_'+item_obj.code);
        let attribute = el.getAttribute('rivemarked');
        if (attribute == 'yes') {
            el.style.borderLeft = '';
            el.setAttribute('rivemarked', 'no');
            this.riveSelectedItem = null;
        } else {
            el.style.borderLeft = "14px solid rgb(33, 153, 232)";
            el.setAttribute('rivemarked', 'yes');
            this.riveSelectedItem = item_obj;
        }
    }

    markIlde(item_id) {
        let el = document.getElementById(item_id);
        let attribute = el.getAttribute('ildemarked');
        if (attribute == 'yes') {
            el.style.borderLeft = '';
            el.setAttribute('ildemarked', 'no');
        } else {
            el.style.borderLeft = "14px solid rgb(33, 153, 232)";
            el.setAttribute('ildemarked', 'yes');
        }
    }

    markLetu(item_id) {
        let el = document.getElementById(item_id);
        let attribute = el.getAttribute('letumarked');
        if (attribute == 'yes') {
            el.style.borderLeft = '';
            el.setAttribute('letumarked', 'no');
        } else {
            el.style.borderLeft = "14px solid rgb(33, 153, 232)";
            el.setAttribute('letumarked', 'yes');
        }
    }

    confirmMatchRive() {
        let dialogRef = this.mdialog.open(MatchDialog, {
          width: '400px',
          data: {
              'gestSelectedItem': this.gestSelectedItem,
              'riveSelectedItem': this.riveSelectedItem
            }
        });
    }

    confirmMatchIlde() {

    }

    confirmMatchLetu() {
        
    }

    getGestoriBrands(event) {
        this.gestoriSelectedBrand = event.source.value;
        this.getPageGestori(1);
    }

    getRiveBrands(event) {
        this.riveSelectedBrand = event.source.value;
        this.getPageRive(1);
    }

    getIldeBrands(event) {
        this.ildeSelectedBrand = event.source.value;
        this.getPageIlde(1);
    }

    getLetuBrands(event) {
        this.letuSelectedBrand = event.source.value;
        this.getPageLetu(1);
    }

    getPageGestori(page: number) {
        this.asyncGestoriProducts = this.serverCallGestoriObservable(page, this.gestoriSelectedBrand)
            .do(res => {
                this.totalMatch = res.count;
                this.p = page;
            }).map(res => res.data);
    }

    serverCallGestoriObservable(page: number, search: string): Observable<any> {
        const perPage = this.pageSize;
        const start = (page - 1) * perPage;
        const end = start + perPage;
        return this.http.get('http://127.0.0.1:5000/gestori_products?page='+page+'&perPage='+perPage+'&search='+search)
    }

    getPageLetu(page: number) {
        this.asyncLetuProducts = this.serverCallLetuObservable(page, this.letuSelectedBrand)
            .do(res => {
                this.totalMatch1 = res.count;
                this.p1 = page;
            }).map(res => res.data);
    }

    serverCallLetuObservable(page: number, search: string): Observable<any> {
        const perPage1 = this.pageSize;
        const start1 = (page - 1) * perPage1;
        const end1 = start1 + perPage1;
        return this.http.get('http://127.0.0.1:5000/letu_products?page='+page+'&perPage='+perPage1+'&search='+search)
    }

    getPageIlde(page: number) {
        this.asyncIldeProducts = this.serverCallIldeObservable(page, this.ildeSelectedBrand)
            .do(res => {
                this.totalMatch2 = res.count;
                this.p2 = page;
            }).map(res => res.data);
    }

    serverCallIldeObservable(page: number, search: string): Observable<any> {
        const start2 = (page - 1) * this.pageSize;
        const end2 = start2 + this.pageSize;
        return this.http.get('http://127.0.0.1:5000/ilde_products?page='+page+'&perPage='+this.pageSize+'&search='+search)
    }

    getPageRive(page: number) {
        this.asyncRiveProducts = this.serverCallRiveObservable(page, this.riveSelectedBrand)
            .do(res => {
                this.totalMatch3 = res.count;
                this.p3 = page;
            }).map(res => res.data);
    }

    serverCallRiveObservable(page: number, search: string): Observable<any> {
        const perPage3 = this.pageSize;
        const start3 = (page - 1) * perPage3;
        const end3 = start3 + perPage3;
        return this.http.get('http://127.0.0.1:5000/rive_products?page='+page+'&perPage='+perPage3+'&search='+search)
    }
}
