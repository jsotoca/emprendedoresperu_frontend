import { IonSlides } from '@ionic/angular';
import { Router } from '@angular/router';
import { Category } from './../../interfaces/category.interface';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoriesService } from './../../services/categories.service';
@Component({
  selector: 'app-categries-slides',
  templateUrl: './categries-slides.component.html',
  styleUrls: ['./categries-slides.component.scss'],
})
export class CategriesSlidesComponent implements OnInit {
  @ViewChild('categorySlides',{static:true}) slides:IonSlides;
  categories:Category[] = [];
  slidesOptions = null;
  
  constructor(
    private categoriesService:CategoriesService,
    private router:Router
  ) { }

  async ngOnInit() {

    this.categories = await this.categoriesService.getCategories();

    this.slidesOptions = {
      initialSlide: 0,
      direction: 'horizontal',
      speed: 300,
      slidesPerView: this.checkScreen(),
      freeMode: true,
      loop: false,
      keyboard: {
        enabled: true,
      }
    };
  }

  checkScreen(){
    if(window.innerWidth>=960){
        return 6;
    }else{
        return 3.3;
    }
  }

  slidePrev() {
    this.slides.slidePrev();
  }
  slideNext() {
    this.slides.slideNext();
  }

  openCategory(c){
    this.router.navigate(['/categories'],{queryParams:{id:c.id,name:c.name,image:c.image}});
  }

}
