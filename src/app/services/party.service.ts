import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
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
export class PartyService {
  constructor(private http: HttpClient, private localStore: LocalService) {
    httpOptions.headers = httpOptions.headers
      .set('Content-Type', 'application/json; charset=utf-8')
      .set('Authorization', 'Bearer ' + this.localStore.getData('token'));
  }
  partiesUrl = environment.apiUrl + 'parties/';
  
  getAllPartiesByElectionId(id: string): Observable<ResponseModel> {
    return this.http.get<ResponseModel>(this.partiesUrl + id, httpOptions);
  }

  getPartyById(id:string): Observable<ResponseModel> {
    return this.http.get<ResponseModel>(this.partiesUrl + "party/" + id, httpOptions)
  }
}
