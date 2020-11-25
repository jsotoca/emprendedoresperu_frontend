import { UiService } from './ui.service';
import { Entrepreneurship, FiltersEntrepreneurships, IEntrepreneurshipSearchResponse } from './../interfaces/entrepreneurship.interface';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  async getEntrepreneurships(filtersEntrepreneurships:FiltersEntrepreneurships){
    var {page,limit,category,subcategory,search} = filtersEntrepreneurships;
    page = page || 1; limit = limit || 50;
    let url = `${APIURL}/entrepreneurship`;
    if(category) url+=`?category=${category}`;
    if(subcategory) url+=`?subcategory=${subcategory}`;
    if(search) url+=`?search=${search}`;
    // console.log(url);
    const { data } = await this.http.get<IEntrepreneurshipResponse>(url).toPromise();
    // console.log(data);
    return data;
  }

  getEntrepreneurshipsRecents(){
    let url = `${APIURL}/entrepreneurship/top/recent`;
    return this.http.get<IEntrepreneurshipResponse>(url);
    // return data;
  }

  async searchEntrepreneurship(id:string){
    const { entrepreneurship } = await this.http.get<IEntrepreneurshipSearchResponse>(`${APIURL}/entrepreneurship/search/${id}`).toPromise();
    return entrepreneurship;
  }

  async createEntrepeurship(object){
    try {
      const { ok }  = await this.http.post<IEntrepreneurshipSearchResponse>(`${APIURL}/entrepreneurship`,object).toPromise();
      if(ok) this.uiService.showToast("Tu emprendimiento fue registrado con exito.");
    } catch (error) {
      this.uiService.showMessage("Upps...","Ha ocurrido un error al momento de registrar el emprendimiento, Probablemente el nombre de tu emprendimiento ya se encuentra registrado.")
      throw error;
    }
  }

  async editEntrepeurship(object){
    try {
      const { ok }  = await this.http.patch<IEntrepreneurshipSearchResponse>(`${APIURL}/entrepreneurship`,object).toPromise();
      if(ok) this.uiService.showMessage("Registro exitoso","Tu emprendimiento fue registrado con exito.");
    } catch (error) {
      console.log(error);
      this.uiService.showMessage("Upps...","Ha ocurrido un error al momento de registrar el emprendimiento, intentalo en un momento o contacta al administrador.")
      throw error;
    }
  }

  async hideEntrepeurship(id){
    try {
      await this.http.patch<Entrepreneurship>(`${APIURL}/entrepreneurship/desverify/${id}`,{}).toPromise();
      this.uiService.showToast(`Emprendimiento despublicado sastifactoriamente.`);
      window.location.reload();
    } catch (error) {
      this.uiService.showMessage("Upps...","Ha ocurrido un error al momento de despublicar el emprendimiento, intentalo en un momento o contacta al administrador.")
      throw error;
    }
  }

  async unsubscribeEntrepeurship(id){
    try {
      const entrepreneurship = await this.http.delete<Entrepreneurship>(`${APIURL}/entrepreneurship/unsubscribe/${id}`).toPromise();
      if(entrepreneurship){
        this.uiService.showToast(`Emprendimiento dado de baja sastifactoriamente.`);
        window.location.reload();
      } 
      else this.uiService.showMessage("Upps...","Ha ocurrido un error al momento de dar de baja el emprendimiento, intentalo en un momento o contacta al administrador.");
    } catch (error) {
      this.uiService.showMessage("Upps...","Ha ocurrido un error al momento de dar de baja el emprendimiento, intentalo en un momento o contacta al administrador.")
      throw error;
    }
  }

}
