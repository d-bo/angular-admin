import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { HttpHeaders, HttpClient } from '@angular/common/http';

// Global scope

@Injectable()
export class GlobalService {

    MAIN_IP = '192.168.65.243';
    constructor(
        private http: HttpClient
    ) {}

    // no cache headers
    noCache() {

        let headers = new HttpHeaders();
        headers.append('Cache-Control', 'no-store, no-cache, no-transform, must-revalidate, max-age=0');
        headers.append('Pragma', 'no-cache');
        headers.append('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT');

        return headers;
    }

    // wrap HttpClient return Observer
    // no-cache headers added
    get(url: string) {
        return this.http.get(
            url + '&_c=' + new Date().getTime().toString(),
            {
                headers: this.noCache()
            }
        );
    }
}
