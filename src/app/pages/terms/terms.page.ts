import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.page.html',
  styleUrls: ['./terms.page.scss'],
})
export class TermsPage implements OnInit {

  @Input() modal:boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
