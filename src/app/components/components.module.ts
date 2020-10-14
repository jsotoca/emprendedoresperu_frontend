import { SidebarComponent } from './sidebar/sidebar.component';
import { DealsRecentComponent } from './deals-recent/deals-recent.component';
import { AdsHomeComponent } from './ads-home/ads-home.component';
import { CategriesSlidesComponent } from './categries-slides/categries-slides.component';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntrepreneurshipsRecentComponent } from './entrepreneurships-recent/entrepreneurships-recent.component';
import { MomentjsPipe } from './momentjs.pipe';



@NgModule({
  declarations: [HeaderComponent,CategriesSlidesComponent,AdsHomeComponent,
    DealsRecentComponent,EntrepreneurshipsRecentComponent,SidebarComponent, MomentjsPipe
  ],
  exports: [HeaderComponent,CategriesSlidesComponent,AdsHomeComponent,
    DealsRecentComponent,EntrepreneurshipsRecentComponent,SidebarComponent, MomentjsPipe 
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ]
})
export class ComponentsModule { }
