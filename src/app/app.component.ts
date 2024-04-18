import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {GlobalService} from "./services/global.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'keka-clone';

  // isNavVisible:boolean | null = null;

  constructor(protected globalService:GlobalService) {
  }

  ngOnInit(){
    // this.isNavVisible = this.globalService.getNavStatus();
  }

}
