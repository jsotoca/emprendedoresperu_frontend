import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ads-home',
  templateUrl: './ads-home.component.html',
  styleUrls: ['./ads-home.component.scss'],
})
export class AdsHomeComponent implements OnInit {

  slideOpts = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay:true,
    speed: 700,
  };

  constructor() { }

  ngOnInit() {}

}
