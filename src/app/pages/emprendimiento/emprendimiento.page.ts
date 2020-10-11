import { Entrepreneurship } from './../../interfaces/entrepreneurship.interface';
import { EntrepreneurshipsService } from './../../services/entrepreneurships.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-emprendimiento',
  templateUrl: './emprendimiento.page.html',
  styleUrls: ['./emprendimiento.page.scss'],
})
export class EmprendimientoPage implements OnInit {

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
    subcategory: null
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
