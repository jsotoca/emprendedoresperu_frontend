import { EditUserPage } from './../edit-user/edit-user.page';
import { UiService } from './../../services/ui.service';
import { AuthService } from './../../services/auth.service';
import { AccountService } from './../../services/account.service';
import { IDetailResponse } from './../../interfaces/account.interface';
import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
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
    public actionSheetController: ActionSheetController,
    public uiService:UiService,
    private router:Router,
    public modalController: ModalController
  ) { }

  ngOnInit() {
  }

  async presentActionSheet(e) {
    const actionSheet = await this.actionSheetController.create({
      header: `${e.name} opciones`,
      cssClass: 'text',
      buttons: [{
        text: 'Visitar emprendimiento',
        icon: 'eye-outline',
        handler: () => {
          this.router.navigate(['/entrepreneurship'],{queryParams:{id:e.id}});
        }
      }, {
        text: 'Editar emprendimiento',
        icon: 'map',
        handler: () => {
          this.router.navigate(['/edit-entrepreneurship'],{queryParams:{id:e.id}});
          // this.router.navigate(['/edit-entrepreneurship',{queryParams:{id:e.id}}]);
        }
      }, {
        text: 'Eliminar emprendimiento',
        icon: 'trash',
        handler: () => {
          this.uiService.routeTo(`/entrepreneurship?id=${e.id}`);
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

  async ionViewDidEnter(){
    this.account = await this.accountService.getDetailsAccount();
  }

  async openModal(){
    this.uiService.presentModal(EditUserPage);
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: EditUserPage,
      cssClass: 'auto-height'
    });
    return await modal.present();
  }

  async logout(){
    this.authService.logout();
  }

}
