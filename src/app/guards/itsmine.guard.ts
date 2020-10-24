import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItsmineGuard implements CanActivate {

  constructor(
    private readonly authService:AuthService,
    private readonly router:Router
  ){}
  
  canActivate(): Promise<boolean> | boolean  {
    return new Promise(async (resolve)=>{
      await this.authService.loadUser();
      const user = this.authService.getUser();
      // console.log(user);
      // console.log("user");
      // const existe = await this.authService.validateUserGuard();
      // if(!existe) this.router.navigate(['/login']);
      resolve(true);
    });
  }
  
}
