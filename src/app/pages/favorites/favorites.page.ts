import { FavoritesService } from './../../services/favorites.service';
import { Entrepreneurship } from 'src/app/interfaces/entrepreneurship.interface';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import * as moment from 'moment';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage {

  @ViewChild('mainSlides',{static:true}) slides:IonSlides;
  entrepreneurships:Entrepreneurship[] = [];

  constructor(
    public favoritesService:FavoritesService
  ) { 
    moment.locale('es');
  }

  async ionViewDidEnter(){
    this.slides.lockSwipes(true);
    this.favoritesService.loadEntrepreneurship();
    this.favoritesService.loadDeals();
  }

  mostrarVentana(event){
    this.slides.lockSwipes(false);
    this.slides.slideTo(event.detail.value);
    this.slides.lockSwipes(true);
  }

  eliminarEmprendimiento(id:number){
    this.favoritesService.deleteEntrepreneurship(id);
  }

  eliminarDeals(id:number){
    this.favoritesService.deleteDeal(id);
  }

  showTime(time:string){
    return  "vence: " + moment(time).fromNow();
  }
}
