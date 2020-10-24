import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { IAdsResponse } from '../interfaces/ads.interface';

const APIURL:string = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AdsService {

  constructor(
    private http:HttpClient
  ) { }

  async getAds(){
    const { data } = await this.http.get<IAdsResponse>(`${APIURL}/ads`).toPromise();
    return data;
  }
}
