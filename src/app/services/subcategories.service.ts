import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subcategory } from '../interfaces/entrepreneurship.interface';

const APIURL:string = environment.apiUrl; 
@Injectable({
  providedIn: 'root'
})
export class SubcategoriesService {

  constructor(
    private http:HttpClient
  ) { }

  async searchSubcategoriesByCategory(id){
    return await this.http.get<Subcategory[]>(`${APIURL}/subcategory/category/${id}`).toPromise();
  }
}
