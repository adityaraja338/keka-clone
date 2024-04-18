import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {GlobalService} from "../services/global.service";

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit{

  constructor(
    private globalService:GlobalService,
    private route:ActivatedRoute
  ) {
  }

  ngOnInit() {
    // const url = this.route.url;
    this.globalService.isNavVisible =  false;
    // console.log(url);
  }

  // constructor(
  //   private globalService:GlobalService,
  //   private route:ActivatedRoute
  // ) {
  // }
  //
  // ngOnInit(){
  //   this.globalService.isNavVisible =  false;
  // }
}
