import { Inject } from '@angular/core';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { URLSearchParams } from '@angular/http';
import { MdSnackBar } from '@angular/material';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { MatchService } from './match.service';
import { GlobalService } from './global.service';

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
    selector: 'match-list',
    templateUrl: './html/match-list.html',
})

// MatchListComponent
export class MatchListComponent implements OnInit {

    mservice: any;
    res: any;
    asyncRes: Observable<any>;

    constructor(
            private matchService: MatchService
        ) {
            this.mservice = matchService;
        }

    ngOnInit(): void {
        this.getListMatched(1);
    }

    add(save_data): void {
        if (this.res !== undefined) {
            this.res.push();
        }
    }

    addElement(item): void {
        if (item !== undefined) {
            this.res.push(item);
        }
        console.log('MatchListComponent item undefined');
    }

    switchVerified(event, item) {
        alert(item);
    }

    getListMatched(page: number) {
        this.asyncRes = this.serverCallListObservable(page)
            .do(res => {
                // nope
            }).map(res => res);
    }

    serverCallListObservable(page: number) {
        return this.mservice.getMatched(1);
    }
}

@Component({
    selector: 'warn-dialog',
    templateUrl: './html/warn-dialog.html',
})

export class WarnDialogComponent {

    constructor(
            private dialogRefMatch: MdDialogRef<WarnDialogComponent>,
            private http: HttpClient,
            @Inject(MD_DIALOG_DATA) public data: any,
            private mlist: MatchListComponent
        ) {}

    onYesClick(): void {
        // pass
    }

    onNoClick(): void {
      this.dialogRefMatch.close();
    }

    refreshMatchList() {
        this.mlist.getListMatched(1);
    }
}

@Component({
  selector: 'match-dialog',
  templateUrl: './html/match-dialog.html',
})

export class MatchDialogComponent {

    constructor(
            public dialogRefMatch: MdDialogRef<MatchDialogComponent>,
            public mdialog: MdDialog,
            private http: HttpClient,
            private globals: GlobalService,
            @Inject(MD_DIALOG_DATA) public data: any
        ) {}

    onNoClick(): void {
      this.dialogRefMatch.close();
    }

    onYesClick(gest, rive, ilde, letu): void {
        this.dialogRefMatch.close();
        this.http.post(
            'http://' + this.globals.MAIN_IP + ':5000/match',
            {'gest': gest, 'rive': rive, 'ilde': ilde, 'letu': letu},
            {
                headers: this.globals.noCache()
            }
        ).subscribe(
            x => {},
            err => {
                const dialogRef = this.mdialog.open(WarnDialogComponent, {
                  data: {
                      'msg': 'ошибка: ' + err
                    }
                });
            },
            () => {
                const dialogRef = this.mdialog.open(WarnDialogComponent, {
                  data: {
                      'msg': 'OK !'
                    }
                });
            }
        );
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

    filteredTextOptions: Observable<any>;
    filteredTextOptionsLetu: Observable<any>;
    filteredTextOptionsRive: Observable<any>;
    filteredTextOptionsIlde: Observable<any>;

    asyncFulltextSearchGest: Observable<any>;
    asyncFulltextSearchLetu: Observable<any>;
    asyncFulltextSearchIlde: Observable<any>;
    asyncFulltextSearchRive: Observable<any>;

    p: any;
    p1: any;
    p2: any;
    p3: any;
    p4: any;
    pgTxt: any;
    pageSize = 7;
    totalMatch: number;
    totalMatch1: number;
    totalMatch2: number;
    totalMatch3: number;
    totalMatch4: number;
    totalMatchGestTxt: number;

    myCompleteMatchControl = new FormControl();
    myCompleteLetuMatchControl = new FormControl();
    myCompleteIldeMatchControl = new FormControl();
    myCompleteRiveMatchControl = new FormControl();

    myTextSearchControl = new FormControl();
    myTextSearchControlLetu = new FormControl();
    myTextSearchControlIlde = new FormControl();
    myTextSearchControlRive = new FormControl();

    gestoriSelectedBrand: any;
    riveSelectedBrand: any;
    letuSelectedBrand: any;
    ildeSelectedBrand: any;

    gestSelectedItem: any;
    riveSelectedItem: any;
    letuSelectedItem: any;
    ildeSelectedItem: any;

    isGestLoaded: boolean;
    isRiveLoaded: boolean;
    isIldeLoaded: boolean;
    isLetuLoaded: boolean;



    constructor(
        private http: HttpClient,
        private mdialog: MdDialog,
        private snackBar: MdSnackBar,
        private mlist: MatchListComponent,
        private globals: GlobalService
    ) {

        this.http = http;
        this.mdialog = mdialog;
        this.snackBar = snackBar;



        // autocomplete BRAND search
        this.filteredMatchOptions = this.myCompleteMatchControl.valueChanges
            .flatMap(val => this.globals.get(
                'http://' + this.globals.MAIN_IP + ':5000/brands?s=' + val + '&p=gest'
            ));

        this.filteredLetuMatchOptions = this.myCompleteLetuMatchControl.valueChanges
            .flatMap(val => this.globals.get('http://' + this.globals.MAIN_IP + ':5000/brands?s=' + val + '&p=letu'));

        this.filteredIldeMatchOptions = this.myCompleteIldeMatchControl.valueChanges
            .flatMap(val => this.globals.get('http://' + this.globals.MAIN_IP + ':5000/brands?s=' + val + '&p=ilde'));

        this.filteredRiveMatchOptions = this.myCompleteRiveMatchControl.valueChanges
            .flatMap(val => this.globals.get('http://' + this.globals.MAIN_IP + ':5000/brands?s=' + val + '&p=rive'));



        // FULL TXT GEST
        this.filteredTextOptions = this.myTextSearchControl.valueChanges
        .flatMap(val => this.globals.get('http://' + this.globals.MAIN_IP + ':5000/ft?s=' + val + '&p=gest'));

        // FULL TXT LETU
        this.filteredTextOptionsLetu = this.myTextSearchControlLetu.valueChanges
        .flatMap(val => this.globals.get('http://' + this.globals.MAIN_IP + ':5000/ft?s=' + val + '&p=letu'));

        // FULL TXT ILDE
        this.filteredTextOptionsIlde = this.myTextSearchControlIlde.valueChanges
        .flatMap(val => this.globals.get('http://' + this.globals.MAIN_IP + ':5000/ft?s=' + val + '&p=ilde'));

        // FULL TXT RIVE
        this.filteredTextOptionsRive = this.myTextSearchControlRive.valueChanges
        .flatMap(val => this.globals.get('http://' + this.globals.MAIN_IP + ':5000/ft?s=' + val + '&p=rive'));
    }

    ngOnInit(): void {
        this.getPageGestori(1, undefined);
        this.getPageLetu(1, undefined);
        this.getPageIlde(1, undefined);
        this.getPageRive(1, undefined);
    }

    // img dialog
    showImg(item) {
        const dialogRef = this.mdialog.open(WarnDialogComponent, {
            data: {
                img: item
            }
        });
    }

    markGestori(item_obj) {
        console.log(item_obj);
        const el = document.getElementById('gest_' + item_obj.artic);
        const attribute = el.getAttribute('gmarked');
        if (attribute === 'yes') {
            el.style.borderLeft = '';
            // el.setAttribute('class', 'selected-item-before');
            el.setAttribute('gmarked', 'no');
            this.gestSelectedItem = undefined;
        } else {
            el.style.borderLeft = '14px solid rgb(33, 153, 232)';
            el.setAttribute('gmarked', 'yes');
            this.gestSelectedItem = item_obj;
        }
    }

    markRive(item_obj) {
        console.log(item_obj);
        const el = document.getElementById('rive_' + item_obj.code);
        const attribute = el.getAttribute('rivemarked');
        if (attribute === 'yes') {
            el.style.borderLeft = '';
            el.setAttribute('rivemarked', 'no');
            this.riveSelectedItem = undefined;
        } else {
            el.style.borderLeft = '14px solid rgb(33, 153, 232)';
            el.setAttribute('rivemarked', 'yes');
            this.riveSelectedItem = item_obj;
        }
    }

    markIlde(item_obj) {
        const el = document.getElementById('ilde_' + item_obj.artic);
        const attribute = el.getAttribute('ildemarked');
        if (attribute === 'yes') {
            el.style.borderLeft = '';
            el.setAttribute('ildemarked', 'no');
            this.ildeSelectedItem = undefined;
        } else {
            el.style.borderLeft = '14px solid rgb(33, 153, 232)';
            el.setAttribute('ildemarked', 'yes');
            this.ildeSelectedItem = item_obj;
        }
    }

    markLetu(item_obj) {
        const el = document.getElementById('letu_' + item_obj.artic);
        const attribute = el.getAttribute('letumarked');
        if (attribute === 'yes') {
            el.style.borderLeft = '';
            el.setAttribute('letumarked', 'no');
            this.letuSelectedItem = undefined;
        } else {
            el.style.borderLeft = '14px solid rgb(33, 153, 232)';
            el.setAttribute('letumarked', 'yes');
            this.letuSelectedItem = item_obj;
        }
    }

    confirmMatchRive() {
        if (this.gestSelectedItem === '' || this.gestSelectedItem === undefined) {
            const dialogRef = this.mdialog.open(WarnDialogComponent, {
              data: {
                  'msg': 'Сначала выберите gestori'
                }
            });
            return;
        }
        if ((this.riveSelectedItem === '' || this.riveSelectedItem === undefined) &&
            (this.ildeSelectedItem === '' || this.ildeSelectedItem === undefined) &&
            (this.letuSelectedItem === '' || this.letuSelectedItem === undefined)) {
                const dialogRef = this.mdialog.open(WarnDialogComponent, {
                  width: '400px',
                  data: {
                      'msg': 'Не выбрано letu || rive || ilde'
                    }
                });
                return;
            }

        const save_data = {
            'gestSelectedItem': this.gestSelectedItem,
            'riveSelectedItem': this.riveSelectedItem,
            'letuSelectedItem': this.letuSelectedItem,
            'ildeSelectedItem': this.ildeSelectedItem
        };
        const dialogRef = this.mdialog.open(MatchDialogComponent, {
            width: '400px',
            data: save_data
        });
    }

    getGestoriBrands(event, item) {
        this.gestoriSelectedBrand = event.source.value;
        this.getPageGestori(1, item);
    }

    getRiveBrands(event, item) {
        this.riveSelectedBrand = event.source.value;
        this.getPageRive(1, item);
    }

    getIldeBrands(event, item) {
        this.ildeSelectedBrand = event.source.value;
        this.getPageIlde(1, item);
    }

    getLetuBrands(event, item) {
        this.letuSelectedBrand = event.source.value;
        this.getPageLetu(1, item);
    }

    serverCallGestoriObservable(page: number, search: string, artic: any): Observable<any> {
        const perPage = this.pageSize;
        const start = (page - 1) * perPage;
        const end = start + perPage;
        // search by article instead of huge string
        if (artic !== undefined) {
            return this.globals.get(
                'http://' + this.globals.MAIN_IP + ':5000/gestori_products?page=' + page + '&perPage=' + perPage + '&art=' + artic
            );
        } else {
            return this.globals.get(
                'http://' + this.globals.MAIN_IP + ':5000/gestori_products?page=' + page + '&perPage=' + perPage + '&search=' + search
            );
        }
    }

    getPageGestori(page: number, artic: any) {
        this.isGestLoaded = true;
        this.asyncGestoriProducts = this.serverCallGestoriObservable(page, this.gestoriSelectedBrand, artic)
            .do(res => {
                this.totalMatch = res.count;
                this.p = page;
                this.isGestLoaded = undefined;
            }).map(res => res.data);
    }

    getPageLetu(page: number, artic: any) {
        this.isLetuLoaded = true;
        this.asyncLetuProducts = this.serverCallLetuObservable(page, this.letuSelectedBrand, artic)
            .do(res => {
                this.totalMatch1 = res.count;
                this.p1 = page;
                this.isLetuLoaded = undefined;
            }).map(res => res.data);
    }

    getPageIlde(page: number, artic: any) {
        this.isIldeLoaded = true;
        this.asyncIldeProducts = this.serverCallIldeObservable(page, this.ildeSelectedBrand, artic)
            .do(res => {
                this.totalMatch2 = res.count;
                this.p2 = page;
                this.isIldeLoaded = undefined;
            }).map(res => res.data);
    }

    getPageRive(page: number, artic: any) {
        this.isRiveLoaded = true;
        this.asyncRiveProducts = this.serverCallRiveObservable(page, this.riveSelectedBrand, artic)
            .do(res => {
                this.totalMatch3 = res.count;
                this.p3 = page;
                this.isRiveLoaded = undefined;
            }).map(res => res.data);
    }

    serverCallRiveObservable(page: number, search: string, artic: any): Observable<any> {
        const perPage3 = this.pageSize;
        const start3 = (page - 1) * perPage3;
        const end3 = start3 + perPage3;
        // search by article instead of huge string
        if (artic !== undefined) {
            return this.globals.get(
                'http://' + this.globals.MAIN_IP + ':5000/rive_products?page=' + page + '&perPage=' + perPage3 + '&art=' + artic
            );
        } else {
            return this.globals.get(
                'http://' + this.globals.MAIN_IP + ':5000/rive_products?page=' + page + '&perPage=' + perPage3 + '&search=' + search
            );
        }
    }

    serverCallIldeObservable(page: number, search: string, artic: any): Observable<any> {
        const start2 = (page - 1) * this.pageSize;
        const end2 = start2 + this.pageSize;
        // search by article instead of huge string
        if (artic !== undefined) {
            return this.globals.get(
                'http://' + this.globals.MAIN_IP + ':5000/ilde_products?page=' + page + '&perPage=' + this.pageSize + '&art=' + artic
            );
        } else {
            return this.globals.get(
                'http://' + this.globals.MAIN_IP + ':5000/ilde_products?page=' + page + '&perPage=' + this.pageSize + '&search=' + search
            );
        }
    }

    serverCallLetuObservable(page: number, search: string, artic: any): Observable<any> {
        const perPage1 = this.pageSize;
        const start1 = (page - 1) * perPage1;
        const end1 = start1 + perPage1;
        // search by article instead of huge string
        if (artic !== undefined) {
            return this.globals.get(
                'http://' + this.globals.MAIN_IP + ':5000/letu_products?page=' + page + '&perPage=' + perPage1 + '&art=' + artic
            );
        } else {
            return this.globals.get(
                'http://' + this.globals.MAIN_IP + ':5000/letu_products?page=' + page + '&perPage=' + perPage1 + '&search=' + search
            );
        }
    }
}
