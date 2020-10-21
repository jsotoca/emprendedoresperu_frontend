import { UiService } from './../../services/ui.service';
import { AuthService } from './../../services/auth.service';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
})
export class EditUserPage implements OnInit {
  
  @Input() id: number;
  @Input() fullname: string;
  @Input() phone: string;
  editForm:FormGroup;
  validation_messages = {
    'fullname': [
    { type: 'minlength', message: 'Tu nombre completo debe tener al menos 5 caracteres.' },
    { type: 'maxlength', message: 'Tu nombre completo debe tener como maximo 65 caracteres.' },
    ],
    'phone': [
      { type: 'pattern', message: 'tu teléfono debe ser fijo o celular. Ejm: 074490954 ó 987654321.' }
    ],
    'password': [
      { type: 'minlength', message: 'La contraseña debe tener al menos 6 caracteres.' },
      { type: 'maxlength', message: 'La contraseña debe tener como maximo 15 caracteres.' },
      { type: 'pattern', message: 'La contraseña debe tener 6 caracteres al menos y contener al menos una mayuscula, una miniscula y un número.' }
    ]
  }
  
  constructor(
    private formBuilder:FormBuilder,
    private authService:AuthService,
    private uiService:UiService,
    private modalCtrl:ModalController
  ) { }


  optionalValidator(validators?: (ValidatorFn | null | undefined)[]): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        return control.value ? Validators.compose(validators)(control) : null;
    };
  }

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      fullname:[this.fullname,[Validators.minLength(5),Validators.maxLength(65)]],
      phone:[this.phone,[Validators.pattern("[0-9]{9}")]],
      password:['',[Validators.pattern(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)]],
    });
  }

  async ionViewDidEnter(){
    this.editForm.setValue({
      fullname:this.fullname,
      phone:this.phone,
      password:null
    });
  }

  showPassword(input: any): any {
    input.type = input.type === 'password' ?  'text' : 'password';
  }

  async edit(){
    let data = {};
    let empty = true;
    for(let field in this.editForm.value){
      if(this.editForm.value[field]){
        data[field] = this.editForm.value[field];;
        empty = false;
      }
    }
    if(empty) this.uiService.showMessage('No hay datos','Necesitas al menos llenar un campo para actualizar tus datos.');
    data['id'] = this.id;
    console.log(data);
    const ok = await this.authService.editUser(data);
    if(ok){
      this.uiService.showToast('Datos actualizados con exito');
      this.modalCtrl.dismiss({
        'dismissed': true
      });
      if(data['password']) this.authService.logout();
      else this.uiService.routeTo(['/account']);
    }
    this.editForm.reset();
  }

}
