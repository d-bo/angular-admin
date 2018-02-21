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
import { MatchService } from './service/match.service';
import { GlobalService } from './service/global.service';
import { ConfirmDialogComponent } from './confirm.dialog.component';
import { MatExpansionPanel,  MatExpansionPanelTitle, MatExpansionPanelHeader, MatExpansionPanelActionRow, MatAccordion, MatExpansionPanelDescription } from '@angular/material';
import { MatDatepickerIntl, MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from '@angular/material/datepicker';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

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
    isMatchListLoaded: boolean;

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
        this.isMatchListLoaded = true;
        this.asyncRes = this.serverCallListObservable(page)
            .do(res => {
                console.log(res);
                this.isMatchListLoaded = undefined;
            }).map(res => res);
    }

    clearMatchedItems(matched_obj) {
        //alert(matched_obj['$oid']);
        console.log("MATCHED OBJ: "+matched_obj)
        let dialog = this.mdialog.open(ConfirmDialogComponent, {
            data: {
                'msg': 'Вы уверены ?',
                'oid': matched_obj
            }
        });
    }

    serverCallListObservable(page: number) {
        return this.mservice.getMatched(1);
    }
}