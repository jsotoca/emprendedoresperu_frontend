import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EntrepreneurshipsPageRoutingModule } from './entrepreneurships-routing.module';

import { EntrepreneurshipsPage } from './entrepreneurships.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EntrepreneurshipsPageRoutingModule,
    ComponentsModule
  ],
  declarations: [EntrepreneurshipsPage]
})
export class EntrepreneurshipsPageModule {}
