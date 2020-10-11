import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categries-slides',
  templateUrl: './categries-slides.component.html',
  styleUrls: ['./categries-slides.component.scss'],
})
export class CategriesSlidesComponent implements OnInit {

  slidesOptions = null;

  constructor() { }

  ngOnInit() {
    this.slidesOptions = {
      initialSlide: 0,
      direction: 'horizontal',
      speed: 300,
      slidesPerView: this.checkScreen(),
      freeMode: true,
      loop: false
    };
  }

  checkScreen(){
    if(window.innerWidth>=960){
        return 5;
    }else{
        return 3.7;
    }
  }

}
