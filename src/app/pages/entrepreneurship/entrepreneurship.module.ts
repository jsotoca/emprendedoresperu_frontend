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
    EntrepreneurshipPageRoutingModule
  ],
  declarations: [EntrepreneurshipPage]
})
export class EntrepreneurshipPageModule {}
