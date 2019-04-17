import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from '../shared/user.model';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User;
  isLoginError : boolean = false;
  constructor(private userService: UserService, private toastr: ToastrService, private router: Router) { }

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
    console.log(form.value);
    this.userService.registerUser(form.value).subscribe((data: any) => {
      if(data.response=="User added succesfully"){
        this.toastr.success(data.response);
        this.resetForm(form);
      }
      else{
        this.toastr.warning(data.response);
      }
    });
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

}
