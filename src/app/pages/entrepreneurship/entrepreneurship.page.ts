import { FavoritesService } from './../../services/favorites.service';
import { UiService } from './../../services/ui.service';
import { EntrepreneurshipsService } from './../../services/entrepreneurships.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Entrepreneurship } from 'src/app/interfaces/entrepreneurship.interface';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Platform } from '@ionic/angular';
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
    subcategory: {
      id:0,name:'',icon:'',image:'',
      category: {
        id:0,
        name:'',
        icon:'',
        image:''
      }
    },
    tags: [
      {
        id:0,
        description:'',
        icon:''
      }
    ],
    deals:[]
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private entrepreneurshipsService:EntrepreneurshipsService,
    private uiService:UiService,
    private callNumber: CallNumber,
    private socialSharing: SocialSharing,
    public platform: Platform,
    public favoritesService:FavoritesService
  ) { }

  getId(){
    return new Promise<string>((resolve)=>{
      this.activatedRoute.queryParams.subscribe(params => {
        resolve(params['id'] as string); 
      });
    });
  }
  
  async ionViewDidEnter(){
    this.uiService.showLoading('Cargando emprendimiento 😄');
    this.id = null;
    this.entrepreneurship = null;
    this.id = await this.getId();
    if(this.id) this.entrepreneurship = await this.entrepreneurshipsService.searchEntrepreneurship(this.id);
    this.uiService.dismissLoading();
    console.log(this.entrepreneurship);
  }

  async ngOnInit() {
    
  }

  callPhone(phone:string){
    this.callNumber.callNumber(phone, true)
    .then(res => console.log('No se pudo llamar!', res))
    .catch(err => {this.uiService.showMessage('No Disponible','Solo se puede realizar la llamada desde un móvil.')});
  }

  share(){
    navigator.share({
      'title': 'Optional title',
      'text': 'Optional message',
      'url': 'http://www.myurl.com'
    }).then(function() {
      console.log('Successful share');
    }).catch(function(error) {
      console.log('Error sharing:', error)
    });
  }

  saveEntrepreneurship(){
    this.favoritesService.saveEntrepreneurship(this.entrepreneurship);
  }

  openSocial(social:string,red){
    if(red == 1) window.open(`https://www.facebook.com/${social}`, '_system');
    if(red == 2) window.open(`https://www.twitter.com/${social}`, '_system');
    if(red == 3) window.open(`https://www.youtube.com/channel/${social}`, '_system');
    if(red == 4) window.open(`https://www.instagram.com/${social}`, '_system');
    if(red == 5) window.open(`https://www.tiktok.com/${social}`, '_system');
    // else this.uiService.showMessage('No Disponible','Este emprendimiento no cuenta con esta red social 😥.');
  }

}
