import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categries-slides',
  templateUrl: './categries-slides.component.html',
  styleUrls: ['./categries-slides.component.scss'],
})
export class CategriesSlidesComponent implements OnInit {

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

  ngOnInit() {}

}
