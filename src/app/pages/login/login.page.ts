import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('mainSlides',{static:true}) slides:IonSlides;

  constructor() { }

  ngOnInit() {
    this.slides.lockSwipes(true);
  }

  mostrarFormulario(event){
    this.slides.lockSwipes(false);
    this.slides.slideTo(event.detail.value);
    this.slides.lockSwipes(true);
  }

  login(flogin:NgForm){
    
  }

}
