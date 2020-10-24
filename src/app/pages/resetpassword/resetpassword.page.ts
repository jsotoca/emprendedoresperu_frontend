import { UiService } from './../../services/ui.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.page.html',
  styleUrls: ['./resetpassword.page.scss'],
})
export class ResetpasswordPage implements OnInit {

  email:string = '';
  token:string = '';
  resetForm:FormGroup;
  validation_messages = {
    'password': [
      { type: 'required', message: 'Contraseña es requerida.' },
      { type: 'minlength', message: 'La contraseña debe tener al menos 6 caracteres.' },
      { type: 'maxlength', message: 'La contraseña debe tener como maximo 15 caracteres.' },
      { type: 'pattern', message: 'La contraseña debe tener 6 caracteres al menos y contener al menos una mayuscula, una miniscula y un número.' }
    ]
  }

  constructor(
    private formBuilder:FormBuilder,
    private authService:AuthService,
    private activatedRoute: ActivatedRoute,
    private uiService:UiService
  ) { }

  getParams(){
    return new Promise<{email:string,token:string}>((resolve)=>{
      this.activatedRoute.queryParams.subscribe(params => {
        const data = {email:params['email'] as string, token:params['token']as string};
        resolve(data); 
      });
    });
  }

  async ngOnInit() {
    this.uiService.showLoading('Cargando datos');
    this.resetForm = this.formBuilder.group({
      password:['',[Validators.required, Validators.pattern(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)]],
    });
    try {
      const {email,token} = await this.getParams();
      this.email = email;
      this.token = token;
    } catch (error) {
      this.uiService.dismissLoading();
    }
    this.uiService.dismissLoading();
  }

  showPassword(input: any): any {
    input.type = input.type === 'password' ?  'text' : 'password';
  }

  async resetPassword(){
    const {password} = this.resetForm.value;
    await this.authService.resetPassword(this.email,this.token,password);
  }

}
