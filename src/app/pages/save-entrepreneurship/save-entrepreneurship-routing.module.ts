import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SaveEntrepreneurshipPage } from './save-entrepreneurship.page';

const routes: Routes = [
  {
    path: '',
    component: SaveEntrepreneurshipPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SaveEntrepreneurshipPageRoutingModule {}
