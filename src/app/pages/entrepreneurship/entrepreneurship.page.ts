import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-entrepreneurship',
  templateUrl: './entrepreneurship.page.html',
  styleUrls: ['./entrepreneurship.page.scss'],
})
export class EntrepreneurshipPage implements OnInit {

  slidesOptions = {
    initialSlide: 0,
    direction: 'horizontal',
    speed: 300,
    slidesPerView: 3.7,
    spaceBetween: 5,
    freeMode: true,
    loop: false
  };

  constructor() { }

  ngOnInit() {
  }

}
