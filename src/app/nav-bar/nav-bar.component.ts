import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

import {GlobalService} from "../services/global.service";
import {HttpService} from "../services/http.service";
import {AuthService} from "../services/auth.service";
import {AdminAuthService} from "../services/admin-auth.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  logginIn=false;

  loginMode = 'login';

  logInEmail = '';
  logInPassword = '';

  signUpName = '';
  signUpEmail = '';
  signUpPassword = '';
  signUpPhone = '';

  isAdmin = false;

  constructor(
    protected globalService:GlobalService,
    protected auth:AuthService,
    protected adminService:AdminAuthService,
    private http:HttpService
  ) {}

  adminLogin(){
    const data:any ={};
    data['user_email']=this.logInEmail;
    data['user_password']=this.logInPassword;
    this.http.postAdminLogin(data).subscribe((res:any)=>{
      // console.log(res)
      if(res?.status == 1){
        this.globalService.userInfo = res?.user_data;
        this.auth.currentUser = res?.user_data;
        this.auth.isLoggedIn = true;
        this.adminService.isAdminLoggedIn = true;
        // this.globalService.isCurrentUserAdmin = true;
        this.logginIn = false;
      }
    },(error)=> {
      window.alert(error?.error?.message);
    });
  }

  userLogIn(){
    const data: any = {};
    data['user_email']=this.logInEmail;
    data['user_password']=this.logInPassword;
    this.http.postUserLogin(data).subscribe((res:any) => {
      if(res?.status == 1){
        this.globalService.userInfo = res?.user_data[0];
        this.auth.currentUser = res?.user_data[0];
        this.auth.isLoggedIn = true;
        this.logginIn = false;
      }
    },(error)=> {
      window.alert(error?.error?.message);
    });
  }

  userSignUp(){
    const data: any = {};
    data['user_name']=this.signUpName;
    data['user_email']=this.signUpEmail;
    data['user_password']=this.signUpPassword;
    data['user_phone']=this.signUpPhone;
    this.http.postCreateUser(data).subscribe((res:any)=>{
      this.logginIn = false;
      window.alert("Signed Up successfully! Please Login");
      this.loginMode = 'login';
      this.signUpName = '';
      this.signUpEmail = '';
      this.signUpPassword = '';
      this.signUpPhone = '';
    },(error)=> {
      window.alert(error?.error?.message);
    })
  }

}
