import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {

  constructor() { }

  isAdminLoggedIn = false;

  checkAdminLoggedIn(){
    return this.isAdminLoggedIn;
  }

}
