import { IDetailResponse } from './../interfaces/account.interface';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const APIURL:string = environment.apiUrl; 

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private http:HttpClient
  ) { }

  async getDetailsAccount(){
    try {
      const account = await this.http.get<IDetailResponse>(`${APIURL}/auth/myaccount`).toPromise();
      return account;
    } catch (error) {
      throw error;
    }
  }

}
