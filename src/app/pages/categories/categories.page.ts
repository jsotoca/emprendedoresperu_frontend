import { UiService } from './../../services/ui.service';
import { FavoritesService } from './../../services/favorites.service';
import { EntrepreneurshipsService } from './../../services/entrepreneurships.service';
import { CategoriesService } from './../../services/categories.service';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/interfaces/category.interface';
import { ActionSheetController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Entrepreneurship, FiltersEntrepreneurships } from 'src/app/interfaces/entrepreneurship.interface';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {
  
  name:string = '';
  image:string = '';
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
    public uiService:UiService
  ) { }

  getCategory(){
    return new Promise<{category:string,name:string,image:string}>((resolve)=>{
      this.activatedRoute.queryParams.subscribe(params => {
        const data = {category:params['id'] as string,name:params['name']as string,image:params['image']as string};
        resolve(data); 
      });
    });
  }

  async ngOnInit() {}

  async ionViewDidEnter(){
    this.entrepreneurships = [];
    this.uiService.showLoading('Cargando los emprendimientos 🚀');
    try {
      const { category, name, image} = await this.getCategory();
      this.name = name;
      this.image = image;
      console.log(image);
      this.filters.category = parseInt(category);
      this.entrepreneurships = await this.entrepreneurshipsService.getEntrepreneurships(this.filters);
      this.uiService.dismissLoading();
    } catch (error) {
      this.uiService.dismissLoading();
    }
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
