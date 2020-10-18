import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditEntrepreneurshipPage } from './edit-entrepreneurship.page';

const routes: Routes = [
  {
    path: '',
    component: EditEntrepreneurshipPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditEntrepreneurshipPageRoutingModule {}
