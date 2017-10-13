import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';



@Injectable()
export class MatchService {

	constructor(public http: HttpClient) {}

	getMatches(): Observable<any> {
		return this.http.get('http://127.0.0.1:5000/getMatched');
	}

	addMatch(): void {
		//itemsMatched.merge
	}
}
