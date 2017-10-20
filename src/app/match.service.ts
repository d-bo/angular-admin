import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';



@Injectable()
export class MatchService {

	constructor(public http: HttpClient) {}

	getMatched(page: any): Observable<any> {
		return this.http.get('http://127.0.0.1:5000/getMatched?perPage=5&page='+page);
	}
}
