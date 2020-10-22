import { SearchService } from './../../services/search.service';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() search:boolean = false;

  constructor(
    public router:Router,
    public searchService:SearchService
  ) { }

  ngOnInit() {}

  searchWeb(value){
    this.searchService.search.next(value);
    this.router.navigate(['/search']);
  }

}
