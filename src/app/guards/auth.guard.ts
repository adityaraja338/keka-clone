import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../services/auth.service";
import {AdminAuthService} from "../services/admin-auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private auth:AuthService,
    private adminAuth:AdminAuthService,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.adminAuth.checkAdminLoggedIn()){
      return false;
    } else{
      if(this.auth.isUserLoggedIn() && !this.adminAuth.checkAdminLoggedIn()){
        return true;
      } else {
        window.alert("Please login first!");
        return false;
      }
    }

  }

}
