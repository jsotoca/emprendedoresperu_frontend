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

  validation_messages = {
      'fullname': [
      { type: 'required', message: 'Tu nombre completo es requerido.' },
      { type: 'minlength', message: 'Tu nombre completo debe tener al menos 5 caracteres.' },
      { type: 'maxlength', message: 'Tu nombre completo debe tener como maximo 65 caracteres.' },
      ],
      'phone': [
        { type: 'required', message: 'tu teléfono es requerida.' },
        { type: 'pattern', message: 'tu teléfono debe ser fijo o celular. Ejm: 074490954 ó 987654321.' }
      ],
      'email': [
      { type: 'required', message: 'Email es requerido.' },
      { type: 'pattern', message: 'Tu cuenta ingresada no es un email valido.' }
      ],
      'password': [
        { type: 'required', message: 'Contraseña es requerida.' },
        { type: 'minlength', message: 'La contraseña debe tener al menos 6 caracteres.' },
    		{ type: 'maxlength', message: 'La contraseña debe tener como maximo 15 caracteres.' },
        { type: 'pattern', message: 'La contraseña debe tener 6 caracteres al menos y contener al menos una mayuscula, una miniscula y un número.' }
      ]
    }

  constructor(
    private formBuilder:FormBuilder,
    private authService:AuthService
  ) { }

  resetForms(){
    this.loginForm.reset();
    this.registerForm.reset();
  }

  async ionViewDidEnter(){
    this.resetForms();
  }

  ngOnInit() {
    this.slides.lockSwipes(true);
    this.loginForm = this.formBuilder.group({
      email:['',[Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password:['',[Validators.required, Validators.pattern(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)]],
    });
    this.registerForm = this.formBuilder.group({
      fullname:['',[Validators.required,Validators.minLength(5),Validators.maxLength(65)]],
      phone:['',[Validators.required, Validators.pattern("[0-9]{9}")]],
      email:['',[Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password:['',[Validators.required, Validators.pattern(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)]],
      terms:['false', Validators.requiredTrue],
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
    this.loginForm.reset();
  }

  register(){
    const {fullname,phone,email,password} = this.registerForm.value;
    this.authService.register(fullname,phone,email,password);
    this.registerForm.reset();
  }

  showPassword(input: any): any {
    input.type = input.type === 'password' ?  'text' : 'password';
  }

}
