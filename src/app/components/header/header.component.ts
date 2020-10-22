import { SearchService } from './../../services/search.service';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSearchbar } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @ViewChild('mySearchbar', {static: false}) searchbar: IonSearchbar;
  constructor(
    public router:Router,
    public searchService:SearchService
  ) { }

  ngOnInit() {}

  searchWeb(value){
    this.searchService.search.next(value);
    this.searchbar.value = null;
    this.router.navigate(['/search']);
  }

  searchMovil(event){
    this.searchService.search.next(event.detail.value);
    this.router.navigate(['/search']);
  }

}
