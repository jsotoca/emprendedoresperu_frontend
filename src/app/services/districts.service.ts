import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IDistrictResponse } from '../interfaces/district.interface';

const APIURL:string = environment.apiUrl; 

@Injectable({
  providedIn: 'root'
})
export class DistrictsService {

  constructor(
    private http:HttpClient
  ) { }

  async getDistricts(){
    const { data } = await this.http.get<IDistrictResponse>(`${APIURL}/district`).toPromise();
    return data;
  }
}
