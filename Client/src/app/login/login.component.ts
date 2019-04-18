import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../shared/user.model';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User;
  isUnauthenticated: boolean = false;
  constructor(private userService: UserService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.user = {
      username: '',
      password: '',
    }
  }

  OnSubmit(form: NgForm) {
    this.userService.userAuthentication(form.value).subscribe((response: HttpResponse<any>) => {
      localStorage.setItem('userToken', response.headers.get('Authorization'));
      this.router.navigate(['/main']);
    }, (err: HttpErrorResponse) => {
      if(err.status==0){
        this.toastr.error("Something went wrong on server side");
      }
      else{
      this.showUnauthenticatedAlert();
    }
    });
  }
  showUnauthenticatedAlert() {
    this.isUnauthenticated = true;
    setTimeout(() => this.isUnauthenticated = false, 3000);
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }

}
