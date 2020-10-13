import { FavoritesService } from './../../services/favorites.service';
import { Platform } from '@ionic/angular';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { UiService } from './../../services/ui.service';
import { DealsService } from './../../services/deals.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Deal } from 'src/app/interfaces/deal.interface';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

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
    type: 0,
    description:'',
    image:'',
    start_date:'',
    end_date:'',
    created_at:'',
    updated_at:'',
    entrepreneurship:{
      id:0,
      name:'',
      logo:'',
      district:{
        id:0,
        district:''
      }
    }
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private dealsService:DealsService,
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
    this.id = await this.getId();
    if(this.id) this.deal = await this.dealsService.getDeal(this.id);
    console.log(this.deal);
  }

  ngOnInit() {
  }

  callPhone(){
    this.callNumber.callNumber(this.deal.entrepreneurship.phone, true)
    .then(res => console.log('No se pudo llamar!', res))
    .catch(err => {this.uiService.showMessage('No Disponible','Solo se puede realizar la llamada desde un móvil.')});
  }

  share(){
    if(this.platform.is("mobile")){
      this.socialSharing.share(
        `hola! chequea esta promoción ${this.deal.name}`,
        `Apoya a un nuevo emprendimiento lambayecano!`,
        this.deal.image,
        `https://publilam.com/deal?id=${this.id}`
      )
      .then(res => console.log('mensaje enviado!', res))
      .catch(err => {this.uiService.showMessage('No Disponible','El servicio no se encuentra disponible en estos momentos.')});
    }else{
      if (navigator.share) {
        navigator.share({
          title: this.deal.name,
          text: `hola! chequea esta promoción ${this.deal.name}`,
          url: `https://publilam.com/deal?id=${this.id}`,
        })
          .then(() => console.log('Mensaje enviado'))
          .catch((error) => this.uiService.showMessage('No Disponible','El servicio no se encuentra disponible en estos momentos.'));
      }
    }
  }

  saveEntrepreneurship(){
    this.favoritesService.saveDeal(this.deal);
  }

}
