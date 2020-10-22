import { SearchService } from './../../services/search.service';
import { FavoritesService } from './../../services/favorites.service';
import { EntrepreneurshipsService } from './../../services/entrepreneurships.service';
import { Component, OnInit } from '@angular/core';
import { Entrepreneurship, FiltersEntrepreneurships } from 'src/app/interfaces/entrepreneurship.interface';
import { ActionSheetController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  
  entrepreneurships:Entrepreneurship[] = [];
  filters:FiltersEntrepreneurships = {
    page:null,
    limit:null,
    category:null,
    search:null,
    subcategory:null
  };

  constructor(
    private entrepreneurshipsService:EntrepreneurshipsService,
    private favoritesService:FavoritesService,
    public actionSheetController: ActionSheetController,
    public router: Router,
    private activatedRoute: ActivatedRoute,
    public searchService:SearchService
  ) { }

  

  ngOnInit() {
  }

  async ionViewDidEnter(){
    this.entrepreneurships = [];
    this.searchService.search.subscribe(async(value) => {
      this.filters.search = value;
      this.entrepreneurships = await this.entrepreneurshipsService.getEntrepreneurships(this.filters);
    });
  }

  async presentActionSheet(e) {
    const actionSheet = await this.actionSheetController.create({
      header: `Menú de opciones`,
      cssClass: 'text',
      buttons: [{
        text: 'Visitar emprendimiento',
        icon: 'eye-outline',
        handler: () => {
          this.router.navigate(['/entrepreneurship'],{queryParams:{id:e.id}});
        }
      }, {
        text: 'Agregar a favoritos',
        icon: 'heart-outline',
        handler: () => {
          this.favoritesService.saveEntrepreneurship(e);
        }
      }, {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

}
