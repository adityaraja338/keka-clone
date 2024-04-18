import {Component, OnInit} from '@angular/core';
import {GlobalService} from "../services/global.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  preview= false;
  cardQuickPreview1 = false;
  cardQuickPreview2 = false;
  cardQuickPreview3 = false;
  cardQuickPreview4 = false;
  cardQuickPreview5 = false;
  cardQuickPreview6 = false;
  cardQuickPreview7 = false;
  cardQuickPreview8 = false;

  constructor(
    protected globalService:GlobalService
  ) {}


  ngOnInit() {
    this.globalService.currentActiveNav = "home";
  }
}
