import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private _apiUrl = "http://localhost:3000/api";
  constructor(private http: HttpClient) { }

  getEvents(){
    return this.http.get<any>(this._apiUrl + "/events");
  }

  getSpecials(){
    return this.http.get<any>(this._apiUrl + "/specials");
  }
}
