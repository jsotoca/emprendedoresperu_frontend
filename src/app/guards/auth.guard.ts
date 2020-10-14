import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private readonly authService:AuthService,
    private readonly router:Router
  ){}

  canActivate(): Promise<boolean> | boolean  {
    return new Promise(async (resolve)=>{
      await this.authService.loadToken();
      const existe = await this.authService.validateUser();
      if(!existe) this.router.navigate(['/login']);
      resolve(existe);
    });
  }
  
}
