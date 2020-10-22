import { CategoriesService } from './../../services/categories.service';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/interfaces/category.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {

  categories:Category[] = [];

  constructor(
    private categoriesService:CategoriesService
  ) { }

  async ngOnInit() {
    this.categories = await this.categoriesService.getCategories();
  }

}
