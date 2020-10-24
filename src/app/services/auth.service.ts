import { environment } from './../../environments/environment';
import { IDatosActuales, IOk, IUser } from './../interfaces/auth.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  public currentUser = new BehaviorSubject<IUser>(null);

  constructor(
    private http:HttpClient,
    private router:Router,
    private storage:Storage,
    private uiService:UiService
  ) { }  

  async ingresar(email:string,password:string){
    try {
      const { token, user } = await this.http.post<IAuthResponse>(`${APIURL}/auth/signin`,{email,password}).toPromise();
      this.currentToken.next(token);
      this.currentUser.next(user);
      this.storage.set('currentToken',this.currentToken.value);
      this.storage.set('currentUser',this.currentUser.value);
      this.router.navigate(['/account']);
    } catch (error) {
      if(error.status == 401) this.uiService.showMessage("Datos incorrectos","El email y/o contreseña no son correctos.")
      else this.uiService.showMessage("Upps...","Ha ocurrido un error al momento de logearte, intentalo en un momento o contacta al administrador.")
      throw error;
    }
  }

  async register(fullname:string,phone:string,email:string,password:string){
    try {
      const { ok,token,user } = await this.http.post<IAuthResponse>(`${APIURL}/auth/signup`,{fullname,phone,email,password}).toPromise();
      this.currentToken.next(token);
      this.currentUser.next(user);
      this.storage.set('currentToken',this.currentToken.value);
      this.storage.set('currentUser',this.currentUser.value);
      this.uiService.showMessage("Registro exitoso","Te acabas de registrar como nuevo emprendedor 💖")
      return ok;
    } catch (error) {
      if(error.status == 409) this.uiService.showMessage("Upps...","Email ya registrado en nuestra base de datos.");
      else this.uiService.showMessage("Upps...","Ha ocurrido un error al momento de registrarse, intentalo en un momento o contacta al administrador.")
      throw error;
    }
  }

  async forgotPassword(email:string){
    this.logout();
    try {
      const { ok } = await this.http.post<IOk>(`${APIURL}/auth/forgotpassword`,{email}).toPromise();
      if(ok) this.uiService.showToast('Email de reseteo de contraseña enviado con exito');
    } catch (error) {
      if(error.status == 401) this.uiService.showMessage("Datos incorrectos","El email no se encuentra registrado.")
      else this.uiService.showMessage("Upps...","El email no se encuentra registrado.")
      throw error;
    }
  }

  async resetPassword(email:string,token:string,password:string){
    try {
      const {ok} = await this.http.post<IOk>(`${APIURL}/auth/resetpassword/${email}/${token}`,{password}).toPromise();
      if(ok){
        this.uiService.showToast('Contraseña actualizada con exito. Redirigiéndote al ingreso.');
        this.logout();
      }else{
        this.uiService.showMessage("Upps...","Los datos de verificación son incorrectos.")
      } 
    } catch (error) {
      this.uiService.showMessage("Upps...","Los datos de verificación son incorrectos.")
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

  async validateUserGuard(){
    const currentData = await this.storage.get('currentUser');
    return (currentData)?true:false;
  }

  async loadUser(){
    const user = await this.storage.get('currentUser');
    if(user) this.currentUser.next(user);
  }

  getUser(){
    return this.currentUser.value;
  }

  getToken(){
    return this.currentToken.value;
  }

  async editUser(object){
    try {
      const ok  = await this.http.patch<boolean>(`${APIURL}/auth`,object).toPromise();
      if(ok) return ok;
      else this.uiService.showMessage("Upps...","Ha ocurrido un error al momento de editar tus datos, intentalo en un momento o contacta al administrador.")
    } catch (error) {
      this.uiService.showMessage("Upps...","Ha ocurrido un error al momento de editar tus datos, intentalo en un momento o contacta al administrador.")
      throw error;
    }
  }

  async deleteUser(id:number){
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        id,
      },
    };
    try {
      const ok  = await this.http.delete<boolean>(`${APIURL}/auth`,options).toPromise();
      if(ok) return ok;
      else this.uiService.showMessage("Upps...","Ha ocurrido un error al momento de eliminar tus datos, intentalo en un momento o contacta al administrador.")
    } catch (error) {
      this.uiService.showMessage("Upps...","Ha ocurrido un error al momento de eliminar tus datos, intentalo en un momento o contacta al administrador.")
      throw error;
    }
  }

  async logout(){
    await this.storage.remove('currentToken');
    this.currentToken.next(null);
    this.router.navigate(['/login']);
  }

}
