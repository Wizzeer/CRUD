import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Response } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/map';
import { User } from './user.model';
import { map } from 'rxjs-compat/operator/map';

@Injectable()
export class UserService {
  readonly rootUrl = 'http://localhost:8080';
  constructor(private http: HttpClient) { }

  registerUser(user: User) {
    const body: User = {
      username: user.username,
      password: user.password,
    }
    var reqHeader = new HttpHeaders({'No-Auth':'True'});
    return this.http.post(this.rootUrl + '/users/sign-up', body,{headers : reqHeader});
  }

  userAuthentication(user: User) {
    const body: User = {
      username: user.username,
      password: user.password,
    }
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json','No-Auth':'True' });
    const options = {
      headers : reqHeader,
      observe: "response"
    }
    console.log(body);
    return this.http.post(this.rootUrl + '/login', body, {headers: reqHeader, observe: "response"});
  }


}