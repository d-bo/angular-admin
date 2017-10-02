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
    myCompleteMatchControl = new FormControl();
    myCompleteLetuMatchControl = new FormControl();
    myCompleteIldeMatchControl = new FormControl();
    myCompleteRiveMatchControl = new FormControl();

    filter(val: string): any {
        return this.http.get('http://127.0.0.1:5000/gestori_brands?search='+val)
    }

    filterLetu(val: string): any {
        return this.http.get('http://127.0.0.1:5000/all_brands?search='+val)
    }

    filterIlde(val: string): any {
        return this.http.get('http://127.0.0.1:5000/all_brands?search='+val)
    }

    filterRive(val: string): any {
        return this.http.get('http://127.0.0.1:5000/all_brands?search='+val)
    }

    constructor(
        private http: HttpClient,
        private dialog: MdDialog,
        private snackBar: MdSnackBar
    ) {

        this.http = http
        this.dialog = dialog
        this.snackBar = snackBar

        this.filteredMatchOptions = this.myCompleteMatchControl.valueChanges
            .flatMap(val => this.http.get('http://127.0.0.1:5000/all_brands?search='+val));

        this.filteredLetuMatchOptions = this.myCompleteLetuMatchControl.valueChanges
            .flatMap(val => this.http.get('http://127.0.0.1:5000/all_brands?search='+val));
    }

    ngOnInit(): void {
        this.getPageGestori(1)
        this.getPageLetu(1)
        this.getPageIlde(1)
        this.getPageRive(1)
    }

    getPageGestori(page: number) {
        this.asyncGestoriProducts = this.serverCallGestoriObservable(page)
            .do(res => {
                this.totalMatch = res.count;
                this.p = page;
            }).map(res => res.data);
    }

    serverCallGestoriObservable(page: number): Observable<any> {
        const perPage = this.pageSize;
        const start = (page - 1) * perPage;
        const end = start + perPage;
        return this.http.get('http://127.0.0.1:5000/gestori_products?page='+page+'&perPage='+perPage)
    }

    getPageLetu(page: number) {
        this.asyncLetuProducts = this.serverCallLetuObservable(page)
            .do(res => {
                this.totalMatch1 = res.count;
                this.p1 = page;
            }).map(res => res.data);
    }

    serverCallLetuObservable(page: number): Observable<any> {
        const perPage1 = this.pageSize;
        const start1 = (page - 1) * perPage1;
        const end1 = start1 + perPage1;
        return this.http.get('http://127.0.0.1:5000/letu_products?page='+page+'&perPage='+perPage1)
    }

    getPageIlde(page: number) {
        this.asyncIldeProducts = this.serverCallIldeObservable(page)
            .do(res => {
                this.totalMatch2 = res.count;
                this.p2 = page;
            }).map(res => res.data);
    }

    serverCallIldeObservable(page: number): Observable<any> {
        const perPage2 = this.pageSize;
        const start2 = (page - 1) * perPage2;
        const end2 = start2 + perPage2;
        return this.http.get('http://127.0.0.1:5000/ilde_products?page='+page+'&perPage='+perPage2)
    }

    getPageRive(page: number) {
        this.asyncRiveProducts = this.serverCallRiveObservable(page)
            .do(res => {
                this.totalMatch3 = res.count;
                this.p3 = page;
            }).map(res => res.data);
    }

    serverCallRiveObservable(page: number): Observable<any> {
        const perPage3 = this.pageSize;
        const start3 = (page - 1) * perPage3;
        const end3 = start3 + perPage3;
        return this.http.get('http://127.0.0.1:5000/rive_products?page='+page+'&perPage='+perPage3)
    }
}