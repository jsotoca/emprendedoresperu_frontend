import { environment } from './../../environments/environment';
import { IDatosActuales } from './../interfaces/auth.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { IAuthRespuesta } from '../interfaces/auth.interface';
import { Storage } from '@ionic/storage';

const APIURL:string = environment.apiUrl; 



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public datosActuales = new BehaviorSubject<IDatosActuales>(null);

  constructor(
    private http:HttpClient,
    private router:Router,
    private storage:Storage
  ) { }  

  async ingresar(email:string,password:string){
    try {
      const data = await this.http.post<IAuthRespuesta>(`${APIURL}/auth/signin`,{email,password}).toPromise();
      if(data.ok){
        this.datosActuales.next({user:data.user,token:data.token});
        this.storage.set('datos',this.datosActuales.value);
        this.router.navigate(['/home']);
      }else {
        console.log("error");
      } 
    } catch (error) {
      throw error;
    }
  }

    

}
