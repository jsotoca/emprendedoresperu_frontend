import { AuthService } from './../../services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('mainSlides',{static:true}) slides:IonSlides;
  loginForm:FormGroup;
  registerForm:FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private authService:AuthService
  ) { }

  ngOnInit() {
    this.slides.lockSwipes(true);
    this.loginForm = this.formBuilder.group({
      email:['',Validators.required],
      password:['',Validators.required],
    });
    this.registerForm = this.formBuilder.group({
      fullname:['',Validators.required],
      phone:['',Validators.required],
      email:['',Validators.required],
      password:['',Validators.required],
    });
  }

  mostrarFormulario(event){
    this.slides.lockSwipes(false);
    this.slides.slideTo(event.detail.value);
    this.slides.lockSwipes(true);
  }

  login(){
    const {email,password} = this.loginForm.value;
    this.authService.ingresar(email,password);
    this.loginForm.reset;
  }

  saludar(){
    console.log("hola mundo");
  }

}
