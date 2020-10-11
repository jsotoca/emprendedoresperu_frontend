import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICategoryResponse } from '../interfaces/category.interface';

const APIURL:string = environment.apiUrl; 

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(
    private http:HttpClient
  ) { }

  async getCategories(){
    const { data } = await this.http.get<ICategoryResponse>(`${APIURL}/category`).toPromise();
    return data;
  }

}
