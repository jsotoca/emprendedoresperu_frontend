import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EntrepreneurshipPageRoutingModule } from './entrepreneurship-routing.module';

import { EntrepreneurshipPage } from './entrepreneurship.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EntrepreneurshipPageRoutingModule,
    ComponentsModule
  ],
  declarations: [EntrepreneurshipPage]
})
export class EntrepreneurshipPageModule {}
