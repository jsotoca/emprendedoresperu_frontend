import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SaveEntrepreneurshipPageRoutingModule } from './save-entrepreneurship-routing.module';

import { SaveEntrepreneurshipPage } from './save-entrepreneurship.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SaveEntrepreneurshipPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [SaveEntrepreneurshipPage]
})
export class SaveEntrepreneurshipPageModule {}
