import { EntrepreneurshipsService } from './../../services/entrepreneurships.service';
import { Component, OnInit } from '@angular/core';
import { Entrepreneurship } from 'src/app/interfaces/entrepreneurship.interface';

@Component({
  selector: 'app-entrepreneurships-recent',
  templateUrl: './entrepreneurships-recent.component.html',
  styleUrls: ['./entrepreneurships-recent.component.scss'],
})
export class EntrepreneurshipsRecentComponent implements OnInit {

  entrepreneurships:Entrepreneurship[] = [];
  slidesOptions = null;

  constructor(
    private entrepreneurshipsService:EntrepreneurshipsService
  ) { }

  async ngOnInit() {
    this.entrepreneurships = await this.entrepreneurshipsService.getEntrepreneurships();
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
        return 2.3;
    }else{
        return 1.1;
    }
  }

}
