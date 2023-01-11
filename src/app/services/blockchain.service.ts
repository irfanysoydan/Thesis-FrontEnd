import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Transaction } from '../models/transaction.model';
import { LocalService } from './local.service';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class BlockchainService {
  constructor(private http: HttpClient, private localStore: LocalService) {
    httpOptions.headers = httpOptions.headers
      .set('Content-Type', 'application/json; charset=utf-8')
      .set('Authorization', 'Bearer ' + this.localStore.getData('token'));
  }
  blockchainURL = environment.blockchainURL;
  getElectionResults(): Observable<any> {
    return this.http.get<any>(this.blockchainURL + 'get_voteResult', httpOptions);
  }

  sendTransactionToBlockchain(transaction: Transaction): Observable<any> {
    return this.http.post<any>(this.blockchainURL + "sendTransaction", { params: { transaction } }, httpOptions);
  }

}
