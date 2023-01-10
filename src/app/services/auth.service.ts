import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login } from '../models/login.model';
import { ResponseModel } from '../models/response.model';
import { User } from '../models/user.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseServerUrl = environment.apiUrl + 'auth/';
  constructor(private http: HttpClient) {}

  registerUser(user: User): Observable<ResponseModel> {
    return this.http.post<ResponseModel>(
      this.baseServerUrl + 'register',
      user,
      httpOptions
    );
  }
  loginUser(user: User): Observable<Login> {
    return this.http.post<Login>(
      this.baseServerUrl + 'login',
      user,
      httpOptions
    );
  }
}
