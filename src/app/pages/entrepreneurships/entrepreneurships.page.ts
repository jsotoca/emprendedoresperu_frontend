import { CategoriesService } from './../../services/categories.service';
import { EntrepreneurshipsService } from './../../services/entrepreneurships.service';
import { Component, OnInit } from '@angular/core';
import { Entrepreneurship, FiltersEntrepreneurships } from 'src/app/interfaces/entrepreneurship.interface';
import { Category } from 'src/app/interfaces/category.interface';

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
    private categoriesService:CategoriesService
  ) { }

  ngOnInit() {
  }

  async ionViewDidEnter(){
    this.entrepreneurships = [];
    this.categories = await this.categoriesService.getCategories();
    this.entrepreneurships = await this.entrepreneurshipsService.getEntrepreneurships(this.filters);
  }

  async filterByCategory(id,name){
    this.entrepreneurships = [];
    this.filters.category = id;
    this.categoria = name;
    this.entrepreneurships = await this.entrepreneurshipsService.getEntrepreneurships(this.filters);
  }

}
