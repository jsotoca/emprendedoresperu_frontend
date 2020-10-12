import { FavoritesService } from './../../services/favorites.service';
import { Entrepreneurship } from 'src/app/interfaces/entrepreneurship.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage {

  entrepreneurships:Entrepreneurship[] = [];

  constructor(
    private favoritesService:FavoritesService
  ) { }

  async ionViewDidEnter(){
    this.entrepreneurships = await this.favoritesService.getEntrepreneurships();
  }

}
