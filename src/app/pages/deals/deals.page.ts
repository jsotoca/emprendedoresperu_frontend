import { DealsService } from './../../services/deals.service';
import { Component, OnInit } from '@angular/core';
import { Deal } from 'src/app/interfaces/deal.interface';
import * as moment from 'moment';
@Component({
  selector: 'app-deals',
  templateUrl: './deals.page.html',
  styleUrls: ['./deals.page.scss'],
})
export class DealsPage implements OnInit {

  deals:Deal[] = [];

  constructor(
    private dealsService:DealsService
  ) { 
    moment.locale('es');
  }

  async ionViewDidEnter(){
    this.deals = await this.dealsService.getDeals();
  }

  ngOnInit() {
  }

  showTime(time:string){
    return  "vence: " + moment(time).fromNow();
  }
  
}
