import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-entrepreneurships-recent',
  templateUrl: './entrepreneurships-recent.component.html',
  styleUrls: ['./entrepreneurships-recent.component.scss'],
})
export class EntrepreneurshipsRecentComponent implements OnInit {

  slidesOptions = {
    initialSlide: 0,
    direction: 'horizontal',
    speed: 300,
    slidesPerView: 1.1,
    freeMode: true,
    loop: false
  };

  constructor() { }

  ngOnInit() {}

}
