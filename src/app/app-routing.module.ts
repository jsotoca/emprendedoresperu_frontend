import { PublicGuard } from './guards/public.guard';
import { AuthGuard } from './guards/auth.guard';
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
    path: 'entrepreneurship/:id',
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
    canActivate:[PublicGuard],
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
  {
    path: 'entrepreneurships',
    loadChildren: () => import('./pages/entrepreneurships/entrepreneurships.module').then( m => m.EntrepreneurshipsPageModule)
  },
  {
    path: 'deal',
    loadChildren: () => import('./pages/deal/deal.module').then( m => m.DealPageModule)
  },
  {
    path: 'deal/:id',
    loadChildren: () => import('./pages/deal/deal.module').then( m => m.DealPageModule)
  },
  {
    path: 'account',
    canActivate:[AuthGuard],
    loadChildren: () => import('./pages/account/account.module').then( m => m.AccountPageModule)
  },
  {
    path: 'save-entrepreneurship',
    canActivate:[AuthGuard],
    loadChildren: () => import('./pages/save-entrepreneurship/save-entrepreneurship.module').then( m => m.SaveEntrepreneurshipPageModule)
  },
  {
    path: 'edit-user',
    loadChildren: () => import('./pages/edit-user/edit-user.module').then( m => m.EditUserPageModule)
  },
  {
    path: 'edit-entrepreneurship',
    canActivate:[AuthGuard],
    loadChildren: () => import('./pages/edit-entrepreneurship/edit-entrepreneurship.module').then( m => m.EditEntrepreneurshipPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
