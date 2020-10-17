import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITagResponse } from '../interfaces/tag.interface';

const APIURL:string = environment.apiUrl; 

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  constructor(
    private http:HttpClient
  ) { }

  async getTags(){
    const { data } = await this.http.get<ITagResponse>(`${APIURL}/tag`).toPromise();
    return data;
  }
}
