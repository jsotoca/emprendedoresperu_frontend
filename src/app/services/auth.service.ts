import { environment } from './../../environments/environment';
import { IDatosActuales } from './../interfaces/auth.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { IAuthResponse } from '../interfaces/auth.interface';
import { Storage } from '@ionic/storage';
import { UiService } from './ui.service';

const APIURL:string = environment.apiUrl; 
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // public datosActuales = new BehaviorSubject<IDatosActuales>(null);
  public currentToken = new BehaviorSubject<string>(null);

  constructor(
    private http:HttpClient,
    private router:Router,
    private storage:Storage,
    private uiService:UiService
  ) { }  

  async ingresar(email:string,password:string){
    try {
      const { token } = await this.http.post<IAuthResponse>(`${APIURL}/auth/signin`,{email,password}).toPromise();
      this.currentToken.next(token);
      this.storage.set('currentToken',this.currentToken.value);
      this.router.navigate(['/account']);
    } catch (error) {
      this.uiService.showMessage("Upps...","Ha ocurrido un error al momento de registrarse, intentalo en un momento o contacta al administrador.")
      console.log(error.status);
      throw error;
    }
  }

  async register(fullname:string,phone:string,email:string,password:string){
    try {
      const { token } = await this.http.post<IAuthResponse>(`${APIURL}/auth/signup`,{fullname,phone,email,password}).toPromise();
      this.currentToken.next(token);
      this.storage.set('currentToken',this.currentToken.value);
      this.uiService.showMessage("Registro exitoso","Te acabas de registrar como nuevo emprendedor 💖")
      this.router.navigate(['/account']);
    } catch (error) {
      this.uiService.showMessage("Upps...","Ha ocurrido un error al momento de registrarse, intentalo en un momento o contacta al administrador.")
      console.log(error.status);
      throw error;
    }
  }

  async validateUser(){
    const currentData = await this.storage.get('currentToken');
    return (currentData)?true:false;
  }

  async loadToken(){
    const token = await this.storage.get('currentToken');
    if(token) this.currentToken.next(token);
  }

  getToken(){
    return this.currentToken.value;
  }

  async logout(){
    await this.storage.remove('currentToken');
    this.currentToken.next(null);
    this.router.navigate(['/login']);
  }

}
