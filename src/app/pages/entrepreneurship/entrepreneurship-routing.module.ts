import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntrepreneurshipPage } from './entrepreneurship.page';

const routes: Routes = [
  {
    path: '',
    component: EntrepreneurshipPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntrepreneurshipPageRoutingModule {}
