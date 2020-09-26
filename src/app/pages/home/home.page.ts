import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  slidesOptions = {
    initialSlide: 0,
    direction: 'horizontal',
    speed: 300,
    slidesPerView: 3.7,
    spaceBetween: 5,
    freeMode: true,
    loop: false
  };

  slidesOptions2 = {
    initialSlide: 0,
    direction: 'horizontal',
    speed: 300,
    slidesPerView: 2.1,
    freeMode: true,
    loop: false
  };

  slidesOptions3 = {
    initialSlide: 0,
    direction: 'horizontal',
    speed: 300,
    slidesPerView: 1.1,
    freeMode: true,
    loop: false
  };

  constructor() { }

  ngOnInit() {
  }

}
