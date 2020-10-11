import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { IEntrepreneurshipResponse, IEntrepreneurshipSearchResponse } from '../interfaces/entrepreneurship.interface';


const APIURL:string = environment.apiUrl; 

@Injectable({
  providedIn: 'root'
})
export class EntrepreneurshipsService {

  constructor(
    private http:HttpClient
  ) { }

  async getEntrepreneurships(){
    const { data } = await this.http.get<IEntrepreneurshipResponse>(`${APIURL}/entrepreneurship`).toPromise();
    return data;
  }

  async searchEntrepreneurship(id:string){
    const { entrepreneurship } = await this.http.get<IEntrepreneurshipSearchResponse>(`${APIURL}/entrepreneurship/search/${id}`).toPromise();
    return entrepreneurship;
  }
}
