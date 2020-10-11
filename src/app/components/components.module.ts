import { AdsHomeComponent } from './ads-home/ads-home.component';
import { CategriesSlidesComponent } from './categries-slides/categries-slides.component';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [HeaderComponent,CategriesSlidesComponent,AdsHomeComponent],
  exports: [HeaderComponent,CategriesSlidesComponent,AdsHomeComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ]
})
export class ComponentsModule { }
