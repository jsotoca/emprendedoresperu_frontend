import { Ads } from './../../interfaces/ads.interface';
import { AdsService } from './../../services/ads.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ads-home',
  templateUrl: './ads-home.component.html',
  styleUrls: ['./ads-home.component.scss'],
})
export class AdsHomeComponent implements OnInit {

  ads:Ads[] = [];

  slideOpts = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay:true,
    speed: 700,
  };

  constructor(
    private adsService:AdsService
  ) { }

  async ngOnInit() {
    this.ads = [];
    this.ads = await this.adsService.getAds();
    this.ads = this.ads.filter(a => a.position == 1);
  }

}
