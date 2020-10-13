import { EntrepreneurshipsService } from './../../services/entrepreneurships.service';
import { Component, OnInit } from '@angular/core';
import { Entrepreneurship } from 'src/app/interfaces/entrepreneurship.interface';

@Component({
  selector: 'app-entrepreneurships',
  templateUrl: './entrepreneurships.page.html',
  styleUrls: ['./entrepreneurships.page.scss'],
})
export class EntrepreneurshipsPage implements OnInit {

  entrepreneurships:Entrepreneurship[] = [];

  constructor(
    private entrepreneurshipsService:EntrepreneurshipsService
  ) { }

  ngOnInit() {
  }

  async ionViewDidEnter(){
    this.entrepreneurships = await this.entrepreneurshipsService.getEntrepreneurships();
  }

}
