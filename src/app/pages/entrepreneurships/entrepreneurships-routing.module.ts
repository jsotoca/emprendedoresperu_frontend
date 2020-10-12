import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntrepreneurshipsPage } from './entrepreneurships.page';

const routes: Routes = [
  {
    path: '',
    component: EntrepreneurshipsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntrepreneurshipsPageRoutingModule {}
