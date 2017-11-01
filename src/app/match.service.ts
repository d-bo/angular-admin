import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './global.service';



@Injectable()
export class MatchService {

    constructor(
        private http: HttpClient,
        private globals: GlobalService
    ) {}

    getMatched(page: any): Observable<any> {
        return this.globals.get(
            'http://' + this.globals.MAIN_IP + ':5000/getMatched?perPage=10&page=' + page
        );
    }
}
