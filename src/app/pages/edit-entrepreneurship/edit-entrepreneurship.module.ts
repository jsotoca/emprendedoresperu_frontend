import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditEntrepreneurshipPageRoutingModule } from './edit-entrepreneurship-routing.module';

import { EditEntrepreneurshipPage } from './edit-entrepreneurship.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditEntrepreneurshipPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [EditEntrepreneurshipPage]
})
export class EditEntrepreneurshipPageModule {}
