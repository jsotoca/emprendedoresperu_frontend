import { UiService } from './ui.service';
import { IEntrepreneurshipSearchResponse } from './../interfaces/entrepreneurship.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { IEntrepreneurshipResponse } from '../interfaces/entrepreneurship.interface';


const APIURL:string = environment.apiUrl; 

@Injectable({
  providedIn: 'root'
})
export class EntrepreneurshipsService {

  constructor(
    private http:HttpClient,
    private uiService:UiService
  ) { }

  async getEntrepreneurships(){
    const { data } = await this.http.get<IEntrepreneurshipResponse>(`${APIURL}/entrepreneurship`).toPromise();
    return data;
  }

  async searchEntrepreneurship(id:string){
    const { entrepreneurship } = await this.http.get<IEntrepreneurshipSearchResponse>(`${APIURL}/entrepreneurship/search/${id}`).toPromise();
    return entrepreneurship;
  }

  async createEntrepeurship(object){
    try {
      const { ok }  = await this.http.post<IEntrepreneurshipSearchResponse>(`${APIURL}/entrepreneurship`,object).toPromise();
      if(ok) this.uiService.showMessage("Registro exitoso","Tu emprendimiento fue registrado con exito.");
    } catch (error) {
      this.uiService.showMessage("Upps...","Ha ocurrido un error al momento de registrar el emprendimiento, intentalo en un momento o contacta al administrador.")
      throw error;
    }
  }

  async editEntrepeurship(object){
    try {
      const { ok }  = await this.http.patch<IEntrepreneurshipSearchResponse>(`${APIURL}/entrepreneurship`,object).toPromise();
      if(ok) this.uiService.showMessage("Registro exitoso","Tu emprendimiento fue registrado con exito.");
    } catch (error) {
      this.uiService.showMessage("Upps...","Ha ocurrido un error al momento de registrar el emprendimiento, intentalo en un momento o contacta al administrador.")
      throw error;
    }
  }

}
