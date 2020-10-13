import { RouterModule } from '@angular/router';
import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DealPageRoutingModule } from './deal-routing.module';

import { DealPage } from './deal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DealPageRoutingModule,
    ComponentsModule,
    RouterModule
  ],
  declarations: [DealPage]
})
export class DealPageModule {}
