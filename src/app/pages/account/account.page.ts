import { EntrepreneurshipsService } from './../../services/entrepreneurships.service';
import { EditUserPage } from './../edit-user/edit-user.page';
import { UiService } from './../../services/ui.service';
import { AuthService } from './../../services/auth.service';
import { AccountService } from './../../services/account.service';
import { IDetailResponse } from './../../interfaces/account.interface';
import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ModalController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  account:IDetailResponse ={
    user: {
      id:0,
      fullname:'',
      phone:'',
      email:''
    },
    entrepreneurships: [],
    deals: []
  };

  constructor(
    private accountService:AccountService,
    private authService:AuthService,
    private entrepreneurshipsService:EntrepreneurshipsService,
    public actionSheetController: ActionSheetController,
    public uiService:UiService,
    private router:Router,
    public modalController: ModalController,
    public alertController:AlertController
  ) { }

  ngOnInit() {
  }

  async presentActionSheet(e) {
    const actionSheet = await this.actionSheetController.create({
      header: `Menú de opciones`,
      cssClass: 'text',
      buttons: [{
        text: 'Visitar emprendimiento',
        icon: 'eye-outline',
        handler: () => {
          this.router.navigate(['/entrepreneurship'],{queryParams:{id:e.id}});
        }
      }, {
        text: 'Editar emprendimiento',
        icon: 'create-outline',
        handler: () => {
          this.router.navigate(['/edit-entrepreneurship'],{queryParams:{id:e.id}});
          // this.router.navigate(['/edit-entrepreneurship',{queryParams:{id:e.id}}]);
        }
      }, {
        text: 'Despublicar emprendimiento',
        icon: 'eye-off',
        handler: () => {
          if(e.isVerified) this.presentAlertConfirmHide(e);
          else this.uiService.showToast(`${e.name} aún no esta publicado.`);
        }
      }, {
        text: 'Eliminar emprendimiento',
        icon: 'trash',
        handler: () => {
          this.presentAlertConfirm(e);
        }
      }, {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  async presentActionSheetUser() {
    const actionSheet = await this.actionSheetController.create({
      header: `Menú de usuario`,
      cssClass: 'text',
      buttons: [{
        text: 'Editar Usuario',
        icon: 'create-outline',
        handler: () => {
          this.presentModal();
        }
      }, {
        text: 'Dar cuenta de baja',
        icon: 'trash',
        handler: () => {
          this.presentAlertConfirmUser();
        }
      }, {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  async presentAlertConfirm(e) {
    const alert = await this.alertController.create({
      cssClass: 'select',
      header: 'Eliminar emprendimiento',
      message: `¿Estas seguro de eliminar ${e.name}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Eliminar',
          cssClass: 'confirmar-eliminar',
          handler: () => {
            this.entrepreneurshipsService.unsubscribeEntrepeurship(e.id);
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlertConfirmHide(e) {
    const alert = await this.alertController.create({
      cssClass: 'select',
      header: 'Despublicar emprendimiento',
      message: `¿Estas seguro de despublicar ${e.name}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Despublicar',
          cssClass: 'confirmar-eliminar',
          handler: () => {
            this.entrepreneurshipsService.hideEntrepeurship(e.id);
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlertConfirmUser() {
    const alert = await this.alertController.create({
      cssClass: 'select',
      header: 'Dar de baja mi cuenta',
      message: `¿Estas seguro de dar de baja tu cuenta?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Eliminar',
          cssClass: 'confirmar-eliminar',
          handler: async () => {
            const ok  = await this.authService.deleteUser(this.account.user.id);
            if(ok){
              this.uiService.showToast('Lamentamos que te vayas 😥, esperamos volver a verte pronto!.');
              this.authService.logout();
            } 
          }
        }
      ]
    });

    await alert.present();
  }
  async ionViewDidEnter(){
    this.account = null;
    this.uiService.showLoading('Cargando tu super cuenta 🚀!')
    this.account = await this.accountService.getDetailsAccount();
    this.uiService.dismissLoading();
  }

  async openModal(){
    this.uiService.presentModal(EditUserPage);
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: EditUserPage,
      cssClass: 'auto-height',
      componentProps: {
        'id': this.account.user.id,
        'fullname': this.account.user.fullname,
        'phone': this.account.user.phone,
      }
    });
    return await modal.present();
  }

  async logout(){
    this.authService.logout();
  }

}
