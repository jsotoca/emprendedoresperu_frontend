import { DealsService } from './../../services/deals.service';
import { Component, OnInit } from '@angular/core';
import { Deal } from 'src/app/interfaces/deal.interface';
import * as moment from 'moment';

@Component({
  selector: 'app-deals-recent',
  templateUrl: './deals-recent.component.html',
  styleUrls: ['./deals-recent.component.scss'],
})
export class DealsRecentComponent implements OnInit {

  deals:Deal[] = [];
  slidesOptions = null;

  constructor(
    private dealsService:DealsService
  ) { 
    moment.locale('es');
  }

  async ngOnInit() {

    this.deals = await this.dealsService.getDeals();

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
        return 4.3;
    }else{
        return 2.1;
    }
  }

  showTime(time:string){
    return  "vence: " + moment(time).fromNow();
  }

}
