import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  loading:boolean;

  constructor(
    public alertController: AlertController,
    public loadingController:LoadingController,
    private router:Router,
    public modalController: ModalController
  ) { }

  routeTo(url){
    this.router.navigate([url]);
  }

  async showMessage(header,message){
    const alert = await this.alertController.create({
      cssClass: 'select',
      header,
      message,
      buttons: [
        {
          cssClass: 'alert-confirm-button',
          text: 'Confirmar'
        }
      ]
    });

    await alert.present();
  }

  async showLoading(message?) {
    this.loading = true;
    return await this.loadingController.create({
      message,
      cssClass: 'loading',
    }).then(a => {
      a.present().then(() => {
        if (!this.loading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }

  async dismissLoading() {
    this.loading = false;
    return await this.loadingController.dismiss();
  }

  async presentModal(ModalPage) {
    const modal = await this.modalController.create({
      component: ModalPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }
  
}
