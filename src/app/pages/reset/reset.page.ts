import { AuthService } from './../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.page.html',
  styleUrls: ['./reset.page.scss'],
})
export class ResetPage implements OnInit {

  resetForm:FormGroup;
  validation_messages = {
    'email': [
      { type: 'required', message: 'Email es requerido.' },
      { type: 'pattern', message: 'Tu cuenta ingresada no es un email valido.' }
    ]
  }

  constructor(
    private formBuilder:FormBuilder,
    private authService:AuthService,
    public modalController: ModalController
  ) { }

  ngOnInit() {
    this.resetForm = this.formBuilder.group({
      email:['',[Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]]
    });
  }

  async resetPassword(){
    const { email } = this.resetForm.value;
    await this.authService.forgotPassword(email);
    this.modalController.dismiss();
  }

}
