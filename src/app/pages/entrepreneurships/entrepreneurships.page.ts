import { UiService } from './../../services/ui.service';
import { FavoritesService } from './../../services/favorites.service';
import { CategoriesService } from './../../services/categories.service';
import { EntrepreneurshipsService } from './../../services/entrepreneurships.service';
import { Component, OnInit } from '@angular/core';
import { Entrepreneurship, FiltersEntrepreneurships } from 'src/app/interfaces/entrepreneurship.interface';
import { Category } from 'src/app/interfaces/category.interface';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-entrepreneurships',
  templateUrl: './entrepreneurships.page.html',
  styleUrls: ['./entrepreneurships.page.scss'],
})
export class EntrepreneurshipsPage implements OnInit {

  entrepreneurships:Entrepreneurship[] = [];
  categories:Category[] = [];
  categoria:string = 'todos';
  slidesOptions = null;
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
    private categoriesService:CategoriesService,
    public uiService:UiService
  ) { }

  ngOnInit() {
  }

  async ionViewDidEnter(){
    this.entrepreneurships = [];
    this.uiService.showLoading('Cargando los emprendimientos 🚀');
    try {
      this.categories = await this.categoriesService.getCategories();
      this.entrepreneurships = await this.entrepreneurshipsService.getEntrepreneurships(this.filters);
      this.uiService.dismissLoading();
    } catch (error) {
      this.uiService.dismissLoading();
    }
  }

  async filterByCategory(id,name){
    this.entrepreneurships = [];
    this.filters.category = id;
    this.categoria = name;
    this.entrepreneurships = await this.entrepreneurshipsService.getEntrepreneurships(this.filters);
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
