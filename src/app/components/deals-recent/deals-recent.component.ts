import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-deals-recent',
  templateUrl: './deals-recent.component.html',
  styleUrls: ['./deals-recent.component.scss'],
})
export class DealsRecentComponent implements OnInit {

  slidesOptions = {
    initialSlide: 0,
    direction: 'horizontal',
    speed: 300,
    slidesPerView: 2.1,
    freeMode: true,
    loop: false
  };

  constructor() { }

  ngOnInit() {}

}
