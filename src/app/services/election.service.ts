import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Election } from '../models/election.model';
import { ResponseModel } from '../models/response.model';
import { LocalService } from './local.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class ElectionService {
  constructor(private http: HttpClient, private localStore: LocalService) {
    httpOptions.headers = httpOptions.headers
      .set('Content-Type', 'application/json; charset=utf-8')
      .set('Authorization', 'Bearer ' + this.localStore.getData('token'));
  }
  electionsUrl = environment.apiUrl + 'elections/';
  getElections(): Observable<ResponseModel> {
    return this.http.get<ResponseModel>(this.electionsUrl, httpOptions);
  }
}
