import { AdsService } from './../../services/ads.service';
import { Component, OnInit } from '@angular/core';
import { Ads } from 'src/app/interfaces/ads.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {

  ads:Ads[] = [];
  public:Ads = null;

  constructor(
    private adsService:AdsService
  ) { }

  async ngOnInit() {
    this.ads = [];
    this.ads = await this.adsService.getAds();
    this.ads = this.ads.filter(a => a.position == 2);
    this.public = this.ads[0];
  }

}
