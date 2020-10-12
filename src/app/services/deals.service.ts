import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Deal, IDealResponse } from '../interfaces/deal.interface';


const APIURL:string = environment.apiUrl; 

@Injectable({
  providedIn: 'root'
})
export class DealsService {

  constructor(
    private http:HttpClient
  ) { }

  async getDeals(){
    const { data } = await this.http.get<IDealResponse>(`${APIURL}/deal`).toPromise();
    return data;
  }

  async getDeal(id){
    const deal = await this.http.get<Deal>(`${APIURL}/deal/search/${id}`).toPromise();
    return deal;
  }
}
