import { AuthService } from './../services/auth.service';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export default class JwtInterceptor implements HttpInterceptor {
    constructor(
        private readonly authService:AuthService
    ){}

    intercept(request:HttpRequest<any>,next:HttpHandler){
        const token = this.authService.getToken();
        if(token){
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }
        return next.handle(request);
    }
}