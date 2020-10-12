import { EntrepreneurshipsService } from './../../services/entrepreneurships.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Entrepreneurship } from 'src/app/interfaces/entrepreneurship.interface';

@Component({
  selector: 'app-entrepreneurship',
  templateUrl: './entrepreneurship.page.html',
  styleUrls: ['./entrepreneurship.page.scss'],
})
export class EntrepreneurshipPage implements OnInit {

  id:string;
  entrepreneurship:Entrepreneurship = {
    id:0,
    name:'',
    description:'',
    slogan: '',
    phone: '',
    address: '',
    location: '',
    logo: '',
    cover: '',
    facebook: '',
    twitter: '',
    youtube: '',
    instagram: '',
    tiktok: '',
    isVerified: false,
    actived: false,
    created_at: '',
    updated_at: '',
    district: {id:0,district:''},
    subcategory: {id:0,name:'',icon:'',image:''},
    deals:[]
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private entrepreneurshipsService:EntrepreneurshipsService
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
    if(this.id) this.entrepreneurship = await this.entrepreneurshipsService.searchEntrepreneurship(this.id);
  }

  async ngOnInit() {
    
  }

}
