import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import {HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    baseURL = environment.baseURL;
    private header = new HttpHeaders({
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': 'application/json',
        'secret-key': '$2a$10$rdeg90UhCy/fvjT8.62R0eJPFHg7MeVP/LXg.YWIQip0oD7TvgiOe'
    });

    constructor(private http: HttpClient) { }

    public getLogs() {
        return this.http.get(`https://api.jsonbin.io/b/5cf8fae63185c64c762da00e`, {headers: this.header});
    }
}
