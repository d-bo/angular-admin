import { Inject } from '@angular/core';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { URLSearchParams } from '@angular/http';
import { MatSnackBar } from '@angular/material';
import { MatChip, MatChipList } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatchService } from './match.service';
import { GlobalService } from './global.service';
import { MatExpansionPanel,  MatExpansionPanelTitle, MatExpansionPanelHeader, MatExpansionPanelActionRow, MatAccordion, MatExpansionPanelDescription } from '@angular/material';
import { MatDatepickerIntl, MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from '@angular/material/datepicker';

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
            private matchService: MatchService,
            public mdialog: MatDialog
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
                console.log(res);
            }).map(res => res);
    }

    clearMatchedItems(matched_obj) {
        alert(matched_obj);
        //alert(matched_obj['$oid']);
        console.log("MATCHED OBJ: "+matched_obj)
        let dialog = this.mdialog.open(ConfirmDialogComponent, {
            data: {
                'msg': 'Are you sure ?',
                'oid': matched_obj
            }
        });
    }

    serverCallListObservable(page: number) {
        return this.mservice.getMatched(1);
    }
}



@Component({
  selector: 'confirm-dialog',
  templateUrl: './html/confirm-dialog.html'
})

export class ConfirmDialogComponent {

    constructor(
            private dialogRefMatch: MatDialogRef<ConfirmDialogComponent>,
            private http: HttpClient,
            private globals: GlobalService,
            public mdialog: MatDialog,
            public MLC: MatchListComponent,
            @Inject(MAT_DIALOG_DATA) public data: any
        ) {}

    onYesClick(oid): void {
        var MLCe = this.MLC;
        var oids = oid;
        this.dialogRefMatch.close();
        this.http.post(
            'http://' + this.globals.MAIN_IP + ':5000/v1/matchDelete',
            {'oid': oids},
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
                MLCe.getListMatched(1);
                document.getElementById("matched_"+oids).remove();
            }
        );
    }

    onNoClick(): void {
      this.dialogRefMatch.close();
    }
}



@Component({
    selector: 'warn-dialog',
    templateUrl: './html/warn-dialog.html',
})

export class WarnDialogComponent {

    constructor(
            private dialogRefMatch: MatDialogRef<WarnDialogComponent>,
            private http: HttpClient,
            @Inject(MAT_DIALOG_DATA) public data: any,
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
            public dialogRefMatch: MatDialogRef<MatchDialogComponent>,
            public mdialog: MatDialog,
            private http: HttpClient,
            private globals: GlobalService,
            @Inject(MAT_DIALOG_DATA) public data: any
        ) {}

    onNoClick(): void {
      this.dialogRefMatch.close();
    }

    onYesClick(gest, rive, ilde, letu): void {
        this.dialogRefMatch.close();
        this.http.post(
            'http://' + this.globals.MAIN_IP + ':5000/v1/match',
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

    isGestChecked: boolean = false;
    isRiveChecked: boolean = false;
    isIldeChecked: boolean = false;
    isLetuChecked: boolean = false;

    gest_chkboxs: boolean = false;
    rive_chkboxs: boolean = false;
    letu_chkboxs: boolean = false;
    ilde_chkboxs: boolean = false;

    panelOpenState: boolean = false;

    months = [
        'jan', 'feb', 'mar', 'apr', 'may',
        'june', 'jule', 'aug', 'sep', 'oct',
        'nov', 'dec'
    ]

    years = [
        '2018', '2017', '2016'
    ]

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

    // Force load by keyword
    // workaround
    // TODO: refactoring
    forceLoadRiveKeyword: any;
    forceLoadLetuKeyword: any;
    forceLoadIldeKeyword: any;

    inputSearchBrand: string;

    constructor(
        private http: HttpClient,
        private mdialog: MatDialog,
        private snackBar: MatSnackBar,
        private mlist: MatchListComponent,
        private globals: GlobalService
    ) {

        this.http = http;
        this.mdialog = mdialog;
        this.snackBar = snackBar;

        // autocomplete BRAND search
        this.filteredMatchOptions = this.myCompleteMatchControl.valueChanges
            .flatMap(val => this.globals.get(
                'http://' + this.globals.MAIN_IP + ':5000/v1/brands?s=' + val + '&p=gest'
            ));

        this.filteredLetuMatchOptions = this.myCompleteLetuMatchControl.valueChanges
            .flatMap(val => this.globals.get(
                'http://' + this.globals.MAIN_IP + ':5000/v1/brands?s=' + val + '&p=letu'
            ));

        this.filteredIldeMatchOptions = this.myCompleteIldeMatchControl.valueChanges
            .flatMap(val => this.globals.get(
                'http://' + this.globals.MAIN_IP + ':5000/v1/brands?s=' + val + '&p=ilde'
            ));

        this.filteredRiveMatchOptions = this.myCompleteRiveMatchControl.valueChanges
            .flatMap(val => this.globals.get(
                'http://' + this.globals.MAIN_IP + ':5000/v1/brands?s=' + val + '&p=rive'
            ));



        // FULL TXT GEST
        this.filteredTextOptions = this.myTextSearchControl.valueChanges
        .flatMap(val => this.globals.get(
            'http://' + this.globals.MAIN_IP + ':5000/v1/ft?s=' + val + '&b=' + this.gestoriSelectedBrand + '&p=gest'
        ));

        // FULL TXT LETU
        this.filteredTextOptionsLetu = this.myTextSearchControlLetu.valueChanges
        .flatMap(val => this.globals.get(
            'http://' + this.globals.MAIN_IP + ':5000/v1/ft?s=' + val + '&b=' + this.letuSelectedBrand + '&p=letu'
        ));

        // FULL TXT ILDE
        this.filteredTextOptionsIlde = this.myTextSearchControlIlde.valueChanges
        .flatMap(val => this.globals.get('http://' + this.globals.MAIN_IP + ':5000/v1/ft?s=' + val + '&b=' + this.letuSelectedBrand + '&p=ilde'));

        // FULL TXT RIVE
        this.filteredTextOptionsRive = this.myTextSearchControlRive.valueChanges
        .flatMap(val => this.globals.get('http://' + this.globals.MAIN_IP + ':5000/v1/ft?s=' + val + '&b=' + this.riveSelectedBrand + '&p=rive'));
    }

    ngOnInit(): void {
        this.forceLoadRiveKeyword = this.forceLoadLetuKeyword = this.forceLoadIldeKeyword = undefined;
        this.getPageGestori(1, undefined, undefined);
        this.getPageLetu(1, undefined);
        this.getPageIlde(1, undefined);
        this.getPageRive(1, undefined);
    }

    // clean input search by brands
    // refresh product list
    cleanAndReloadGest() {
        this.myCompleteMatchControl.reset();
        this.gestoriSelectedBrand = undefined;
        this.getPageGestori(1, undefined, undefined);
    }
    cleanAndReloadRive() {
        this.myCompleteRiveMatchControl.reset();
        this.riveSelectedBrand = undefined;
        this.getPageRive(1, undefined);
    }
    cleanAndReloadIlde() {
        this.myCompleteIldeMatchControl.reset();
        this.ildeSelectedBrand = undefined;
        this.getPageIlde(1, undefined);
    }
    cleanAndReloadLetu() {
        this.myCompleteLetuMatchControl.reset();
        this.letuSelectedBrand = undefined;
        this.getPageLetu(1, undefined);
    }

    // img dialog
    showImg(item) {
        const dialogRef = this.mdialog.open(WarnDialogComponent, {
            data: {
                img: item
            }
        });
    }

    // Match by score
    gestoriSearchAll(gest_artic) {
        this.forceLoadRiveKeyword = this.forceLoadLetuKeyword = this.forceLoadIldeKeyword = gest_artic;
        this.getPageLetu(1, undefined);
        this.getPageIlde(1, undefined);
        this.getPageRive(1, undefined);
    }

    markGestori(item_obj) {

        const el = document.getElementById('gest_' + item_obj.artic);
        const attribute = el.getAttribute('gmarked');
        const div = document.getElementById('gest_' + item_obj.artic + '_div');

        this.unselectProds("gest_card");

        if (attribute === 'yes') {
            el.style.setProperty('position', 'initial', 'important');
            el.style.setProperty('filter', 'invert(0%)');
            // el.setAttribute('class', 'selected-item-before');
            el.setAttribute('gmarked', 'no');
            this.gestSelectedItem = undefined;
        } else {
            el.style.setProperty('position', 'fixed', 'important');
            el.style.setProperty('top', '10px', 'important');
            el.style.setProperty('left', '10px', 'important');
            el.style.setProperty('filter', 'invert(100%)');
            el.style.setProperty('z-index', '1001');
            el.setAttribute('gmarked', 'yes');
            this.gestSelectedItem = item_obj;
            this.gestoriSearchAll(item_obj.name_e);
        }
        console.log(div.style.position);
    }

    markRive(item_obj) {
        
        const el = document.getElementById('rive_' + item_obj.code);
        const attribute = el.getAttribute('rivemarked');

        this.unselectProds("rive_card");

        if (attribute === 'yes') {
            el.style.filter = 'invert(0%)';
            el.setAttribute('rivemarked', 'no');
            this.riveSelectedItem = undefined;
        } else {
            el.style.filter = 'invert(100%)';
            el.setAttribute('rivemarked', 'yes');
            this.riveSelectedItem = item_obj;
        }
    }

    markIlde(item_obj) {
        const el = document.getElementById('ilde_' + item_obj.artic);
        const attribute = el.getAttribute('ildemarked');

        this.unselectProds("ilde_card");

        if (attribute === 'yes') {
            el.style.filter = 'invert(0%)';
            el.setAttribute('ildemarked', 'no');
            this.ildeSelectedItem = undefined;
        } else {
            el.style.filter = 'invert(100%)';
            el.setAttribute('ildemarked', 'yes');
            this.ildeSelectedItem = item_obj;
        }
    }

    markLetu(item_obj) {
        const el = document.getElementById('letu_' + item_obj.artic);
        const attribute = el.getAttribute('letumarked');

        this.unselectProds("letu_card");

        if (attribute === 'yes') {
            el.style.filter = 'invert(0%)';
            el.setAttribute('letumarked', 'no');
            this.letuSelectedItem = undefined;
        } else {
            el.style.filter = 'invert(100%)';
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
            width: '600px',
            data: save_data
        });

        // Uncheck gestori product cards
        this.unselectProds("letu_card");
        this.unselectProds("ilde_card");
        this.unselectProds("rive_card");
        this.unselectProds("gest_card");

        this.riveSelectedItem = undefined;
        this.letuSelectedItem = undefined;
        this.ildeSelectedItem = undefined;
        this.gestSelectedItem = undefined;

        this.mlist.getListMatched(1);
    }

    unselectProds(sel_class) {
        // Uncheck gestori product cards
        let els = <any>document.getElementsByClassName(sel_class);
        for (let i = 0; i < els.length; i++) {
            if (els[i].style!==undefined) {
                els[i].style.filter = 'invert(0%)';
            }
        }
    }

    getGestoriBrands(event, item) {
        this.gestoriSelectedBrand = event.source.value;
        this.getPageGestori(1, item, undefined);
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

    // search gestori global
    gestoriBrandPlusKeyword() {
        const brand = this.myCompleteMatchControl.value;
        const txt = this.myTextSearchControl.value;

        this.getPageGestori(1, brand, txt);
    }

    // search gestori global
    riveBrandPlusKeyword() {
        this.forceLoadRiveKeyword = this.forceLoadLetuKeyword = this.forceLoadIldeKeyword = undefined;
        this.getPageRive(1, this.myCompleteRiveMatchControl.value);
    }

    // search gestori global
    letuBrandPlusKeyword() {
        this.forceLoadRiveKeyword = this.forceLoadLetuKeyword = this.forceLoadIldeKeyword = undefined;
        this.getPageLetu(1, this.myCompleteLetuMatchControl.value);
    }

    // search gestori global
    ildeBrandPlusKeyword() {
        this.forceLoadRiveKeyword = this.forceLoadLetuKeyword = this.forceLoadIldeKeyword = undefined;
        this.getPageIlde(1, this.myCompleteIldeMatchControl.value);
    }

    // 
    getProductPrices(vendor: any, id: any) {
        alert(vendor+":"+id)
    }

    // get gestori products
    getPageGestori(page: number, artic: any, keyword: any) {
        this.isGestLoaded = true;
        this.asyncGestoriProducts = this.serverCallGestoriObservable(
            page, this.gestoriSelectedBrand, artic, keyword
        ).do(res => {
            this.totalMatch = res.count;
            // total found products check
            if (res.data.length < 1) {
                const dialogRef = this.mdialog.open(WarnDialogComponent, {
                    data: {
                        'msg': 'Не найдено'
                        }
                    });
                this.totalMatch = 0;
            }
            this.p = page;
            this.isGestLoaded = undefined;
        }).map(res => res.data);
    }

    getPageLetu(page: number, keyword: any) {
        this.isLetuLoaded = true;
        this.asyncLetuProducts = this.serverCallLetuObservable(page, this.letuSelectedBrand)
            .do(res => {
                this.totalMatch1 = res.count;
                // total found products check
                if (res.data.length < 1) {
                    const dialogRef = this.mdialog.open(WarnDialogComponent, {
                        data: {
                            'msg': 'Не найдено'
                          }
                      });
                    this.totalMatch1 = 0;
                }
                this.p1 = page;
                this.isLetuLoaded = undefined;
            }).map(res => res.data);
    }

    getPageIlde(page: number, keyword: any) {
        this.isIldeLoaded = true;
        this.asyncIldeProducts = this.serverCallIldeObservable(page, this.ildeSelectedBrand)
            .do(res => {
                this.totalMatch2 = res.count;
                // total found products check
                if (res.data.length < 1) {
                    const dialogRef = this.mdialog.open(WarnDialogComponent, {
                        data: {
                            'msg': 'Не найдено'
                          }
                      });
                    this.totalMatch2 = 0;
                }
                this.p2 = page;
                this.isIldeLoaded = undefined;
            }).map(res => res.data);
    }

    getPageRive(page: number, keyword: any) {
        this.isRiveLoaded = true;
        this.asyncRiveProducts = this.serverCallRiveObservable(page, this.riveSelectedBrand)
            .do(res => {
                this.totalMatch3 = res.count;
                // total found products check
                if (res.data.length < 1) {
                    const dialogRef = this.mdialog.open(WarnDialogComponent, {
                        data: {
                            'msg': 'Не найдено'
                          }
                      });
                    this.totalMatch3 = 0;
                }
                this.p3 = page;
                this.isRiveLoaded = undefined;
            }).map(res => res.data);
    }

    serverCallGestoriObservable(page: number, brand: string, artic: any, keyword: any): Observable<any> {
        const perPage = this.pageSize;
        const start = (page - 1) * perPage;
        const end = start + perPage;
        const txt = this.myTextSearchControl.value;
        brand = this.myCompleteMatchControl.value;
        // search by article instead of huge string
        return this.globals.get(
            'http://' + this.globals.MAIN_IP + ':5000/v1/gestori_products?p=' + page + '&pP=' + perPage + '&s=' + brand + '&kw=' + encodeURIComponent(txt)
        );
    }

    serverCallRiveObservable(page: number, search: string): Observable<any> {
        const perPage3 = this.pageSize;
        const start3 = (page - 1) * perPage3;
        const end3 = start3 + perPage3;
        let kw = this.myTextSearchControlRive.value;
        search = this.myCompleteRiveMatchControl.value;

        // Force search by keyword
        if (this.forceLoadRiveKeyword !== undefined) {
            kw = this.forceLoadRiveKeyword;
            search = undefined;
        }

        // search by article instead of huge string
        return this.globals.get(
            'http://' + this.globals.MAIN_IP + ':5000/v1/rive_products?page=' + page + '&perPage=' + perPage3 + '&kw=' + kw + '&search=' + search
        );
    }

    serverCallIldeObservable(page: number, search: string): Observable<any> {
        const start2 = (page - 1) * this.pageSize;
        const end2 = start2 + this.pageSize;
        let kw = this.myTextSearchControlIlde.value;
        search = this.myCompleteIldeMatchControl.value;

        // Force search by keyword
        if (this.forceLoadIldeKeyword !== undefined) {
            kw = this.forceLoadIldeKeyword;
            search = undefined;
        }

        // search by article instead of huge string
        return this.globals.get(
            'http://' + this.globals.MAIN_IP + ':5000/v1/ilde_products?page=' + page + '&perPage=' + this.pageSize + '&kw=' + kw + '&search=' + search
        );
    }

    serverCallLetuObservable(page: number, search: string): Observable<any> {
        const perPage1 = this.pageSize;
        const start1 = (page - 1) * perPage1;
        const end1 = start1 + perPage1;
        let kw = this.myTextSearchControlLetu.value;
        search = this.myCompleteLetuMatchControl.value;

        // Force search by keyword
        if (this.forceLoadLetuKeyword !== undefined) {
            kw = this.forceLoadLetuKeyword;
            search = undefined;
        }

        // search by article instead of huge string
        return this.globals.get(
            'http://' + this.globals.MAIN_IP + ':5000/v1/letu_products?page=' + page + '&perPage=' + perPage1 + '&kw=' + kw + '&search=' + search
        );
    }
}