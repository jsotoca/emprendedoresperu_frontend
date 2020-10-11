import { Category } from './../../interfaces/category.interface';
import { Component, OnInit } from '@angular/core';
import { CategoriesService } from './../../services/categories.service';
@Component({
  selector: 'app-categries-slides',
  templateUrl: './categries-slides.component.html',
  styleUrls: ['./categries-slides.component.scss'],
})
export class CategriesSlidesComponent implements OnInit {

  categories:Category[] = [];
  slidesOptions = null;
  
  constructor(
    private categoriesService:CategoriesService
  ) { }

  async ngOnInit() {

    this.categories = await this.categoriesService.getCategories();

    this.slidesOptions = {
      initialSlide: 0,
      direction: 'horizontal',
      speed: 300,
      slidesPerView: this.checkScreen(),
      freeMode: true,
      loop: false
    };
  }

  checkScreen(){
    if(window.innerWidth>=960){
        return 5;
    }else{
        return 3.7;
    }
  }

}
