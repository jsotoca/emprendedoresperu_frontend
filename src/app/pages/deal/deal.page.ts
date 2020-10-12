import { DealsService } from './../../services/deals.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Deal } from 'src/app/interfaces/deal.interface';

@Component({
  selector: 'app-deal',
  templateUrl: './deal.page.html',
  styleUrls: ['./deal.page.scss'],
})
export class DealPage implements OnInit {

  id:string;
  deal:Deal ={
    id:0,
    name:'',
    description:'',
    image:'',
    start_date:'',
    end_date:'',
    created_at:'',
    updated_at:''
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private dealsService:DealsService
  ) { }

  getId(){
    return new Promise<string>((resolve)=>{
      this.activatedRoute.queryParams.subscribe(params => {
        resolve(params['id'] as string); 
      });
    });
  }

  async ionViewDidEnter(){
    this.id = await this.getId();
    if(this.id) this.deal = await this.dealsService.getDeal(this.id);
    console.log(this.deal);
  }

  ngOnInit() {
  }

}
