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
import { WarnDialogComponent } from './warn.dialog.component';
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
  selector: 'confirm-dialog',
  templateUrl: './html/confirm-dialog.html'
})

export class ConfirmDialogComponent {

    constructor(
            private dialogRefMatch: MatDialogRef<ConfirmDialogComponent>,
            private http: HttpClient,
            private globals: GlobalService,
            public mdialog: MatDialog,
            @Inject(MAT_DIALOG_DATA) public data: any
        ) {}

    onYesClick(oid): void {
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
                document.getElementById("matched_"+oids).remove();
            }
        );
    }

    onNoClick(): void {
      this.dialogRefMatch.close();
    }
}