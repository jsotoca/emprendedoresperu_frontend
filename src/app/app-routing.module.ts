import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'entrepreneurship',
    loadChildren: () => import('./pages/entrepreneurship/entrepreneurship.module').then( m => m.EntrepreneurshipPageModule)
  },
  {
    path: 'categories',
    loadChildren: () => import('./pages/categories/categories.module').then( m => m.CategoriesPageModule)
  },
  {
    path: 'favorites',
    loadChildren: () => import('./pages/favorites/favorites.module').then( m => m.FavoritesPageModule)
  },
  {
    path: 'deals',
    loadChildren: () => import('./pages/deals/deals.module').then( m => m.DealsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'emprendimiento',
    loadChildren: () => import('./pages/emprendimiento/emprendimiento.module').then( m => m.EmprendimientoPageModule)
  },
  {
    path: 'emprendimiento/:id',
    loadChildren: () => import('./pages/emprendimiento/emprendimiento.module').then( m => m.EmprendimientoPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
