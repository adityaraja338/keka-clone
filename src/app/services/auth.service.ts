import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isLoggedIn = false;

  currentUser: any = null;

  isUserLoggedIn(){
    return this.isLoggedIn;
  }
}
