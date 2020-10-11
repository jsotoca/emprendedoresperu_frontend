import { CategoriesService } from './../../services/categories.service';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/interfaces/category.interface';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

  categories:Category[] = [];
  
  constructor(
    private categoriesService:CategoriesService
  ) { }

  async ngOnInit() {
    this.categories = await this.categoriesService.getCategories();
  }

}
