import { ComponentsModule } from './components/components.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';

import { CallNumber } from '@ionic-native/call-number/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import JwtInterceptor from './interceptors/jwt.interceptor';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ErrorInterceptor } from './interceptors/error.interceptor';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, IonicModule.forRoot(), AppRoutingModule,ComponentsModule,
    HttpClientModule,IonicStorageModule.forRoot({name:'bd_emprendedores'}), ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CallNumber,
    SocialSharing,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi:true},
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
