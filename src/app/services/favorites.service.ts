import { UiService } from './ui.service';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Entrepreneurship } from '../interfaces/entrepreneurship.interface';
import { Deal } from '../interfaces/deal.interface';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  entrepreneurships:Entrepreneurship[] = [];
  deals:Deal[] = [];

  constructor(
    private storage:Storage,
    private uiService:UiService
  ) { }


  async saveEntrepreneurship(entreprenership:Entrepreneurship){
    this.entrepreneurships = await this.storage.get("entrepreneurships");
    if(this.entrepreneurships){
      const idx = this.entrepreneurships.findIndex(e => e.id == entreprenership.id);
      if(idx !== -1) this.uiService.showMessage("Emprendimiento ya guardado",`${entreprenership.name} ya se encuentra registrado.`);
      else {
        this.entrepreneurships.unshift(entreprenership);
        this.storage.set("entrepreneurships",this.entrepreneurships);
        this.uiService.showMessage("Emprendimiento guardado",`${entreprenership.name} se registro con exito.`);
      } 
    }else{
      this.entrepreneurships = [];
      this.entrepreneurships.unshift(entreprenership);
      this.storage.set("entrepreneurships",this.entrepreneurships);
      this.uiService.showMessage("Emprendimiento guardado",`${entreprenership.name} se registro con exito.`);
    }
  }

  async getEntrepreneurships(){
    this.entrepreneurships = await this.storage.get("entrepreneurships");
    return this.entrepreneurships;
  }

  async loadEntrepreneurship(){
    this.entrepreneurships = await this.storage.get("entrepreneurships");
    if(!this.entrepreneurships) this.entrepreneurships = [];
  }

  async loadDeals(){
    this.deals = await this.storage.get("deals");
    if(!this.deals) this.deals = [];
  }

  async saveDeal(deal:Deal){
    this.deals = await this.storage.get("deals");
    if(this.deals){
      const idx = this.deals.findIndex(e => e.id == deal.id);
      if(idx !== -1) this.uiService.showMessage("Promoción ya guardada",`${deal.name} ya se encuentra registrada.`);
      else {
        this.deals.unshift(deal);
        this.storage.set("deals",this.deals);
        this.uiService.showMessage("Promoción guardada",`${deal.name} se registro con exito.`);
      } 
    }else{
      this.deals = [];
      this.deals.unshift(deal);
      this.storage.set("deals",this.deals);
      this.uiService.showMessage("Promoción guardada",`${deal.name} se registro con exito.`);
    }
  }

  async getDeals(){
    this.deals = await this.storage.get("deals");
    return this.deals;
  }

  async deleteEntrepreneurship(id:number){
    this.entrepreneurships = await this.storage.get("entrepreneurships");
    if(this.entrepreneurships){
      this.entrepreneurships = this.entrepreneurships.filter(e => e.id != id);
      this.storage.set("entrepreneurships",this.entrepreneurships);
      this.uiService.showMessage("Emprendimiento Eliminado",`El emprendimiento se elimino con exito.`);
    }else{
      this.entrepreneurships = [];
      this.uiService.showMessage("Emprendimiento no encontrado",`No se puede eliminar dicho emprendimiento.`);
    }
  }

  async deleteDeal(id:number){
    this.deals = await this.storage.get("deals");
    if(this.deals){
      this.deals = this.deals.filter(e => e.id != id);
      this.storage.set("deals",this.deals);
      this.uiService.showMessage("Emprendimiento Eliminado",`El emprendimiento se elimino con exito.`);
    }else{
      this.deals = [];
      this.uiService.showMessage("Emprendimiento no encontrado",`No se puede eliminar dicho emprendimiento.`);
    }
  }

}
