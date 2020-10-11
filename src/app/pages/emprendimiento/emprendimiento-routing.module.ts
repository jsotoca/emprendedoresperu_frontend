import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmprendimientoPage } from './emprendimiento.page';

const routes: Routes = [
  {
    path: '',
    component: EmprendimientoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmprendimientoPageRoutingModule {}
