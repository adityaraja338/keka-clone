import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  isNavVisible = true;
  currentActiveNav : string | null = null;

  userInfo: any = null;
  // isCurrentUserAdmin =false;

  constructor() { }

  getNavStatus(){
    // return this.isNavVisible;
  }
}
