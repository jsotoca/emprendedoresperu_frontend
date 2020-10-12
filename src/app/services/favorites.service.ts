import { UiService } from './ui.service';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Entrepreneurship } from '../interfaces/entrepreneurship.interface';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  entrepreneurships:Entrepreneurship[] = [];

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
}
