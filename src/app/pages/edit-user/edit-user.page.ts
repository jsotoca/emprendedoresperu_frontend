import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
})
export class EditUserPage implements OnInit {

  editForm:FormGroup;
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
    private formBuilder:FormBuilder
  ) { }

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      fullname:['',[Validators.required,Validators.minLength(5),Validators.maxLength(65)]],
      phone:['',[Validators.required, Validators.pattern("[0-9]{9}")]],
      password:['',[Validators.required, Validators.pattern(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)]],
    });
  }

  showPassword(input: any): any {
    input.type = input.type === 'password' ?  'text' : 'password';
  }

  edit(){}

}
