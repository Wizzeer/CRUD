import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/map';
import { User } from './user.model';
import { ToastrService } from 'ngx-toastr';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class UserService {
  readonly rootUrl = 'http://localhost:8080';
  constructor(private http: HttpClient, private toastr: ToastrService) { }

  registerUser(user: User) {
    const body: User = {
      username: user.username,
      password: user.password,
    }
    let reqHeader = new HttpHeaders({'No-Auth':'True'});
    return this.http.post(this.rootUrl + '/users/sign-up', body,{headers : reqHeader}).catch((error: HttpErrorResponse)=>{
      this.toastr.error("Something went wrong on server side");
      return Observable.throw(error);
    });
  }

  userAuthentication(user: User) {
    const body: User = {
      username: user.username,
      password: user.password,
    }
    let reqHeader = new HttpHeaders({ 'Content-Type': 'application/json','No-Auth':'True' });
    const options = {
      headers : reqHeader,
      observe: "response"
    }
    return this.http.post(this.rootUrl + '/login', body, {headers: reqHeader, observe: "response"});
  }



}