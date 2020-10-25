import { EntrepreneurshipsService } from './../../services/entrepreneurships.service';
import { Component, OnInit } from '@angular/core';
import { Entrepreneurship, FiltersEntrepreneurships } from 'src/app/interfaces/entrepreneurship.interface';

@Component({
  selector: 'app-entrepreneurships-recent',
  templateUrl: './entrepreneurships-recent.component.html',
  styleUrls: ['./entrepreneurships-recent.component.scss'],
})
export class EntrepreneurshipsRecentComponent implements OnInit {

  entrepreneurships:Entrepreneurship[] = [];
  slidesOptions = null;
  filters:FiltersEntrepreneurships = {
    page:null,
    limit:10,
    category:null,
    search:null,
    subcategory:null
  };

  constructor(
    private entrepreneurshipsService:EntrepreneurshipsService
  ) { }

  async ngOnInit() {
    this.loadData();
    this.slidesOptions = {
      initialSlide: 0,
      direction: 'horizontal',
      speed: 300,
      slidesPerView: this.checkScreen(),
      freeMode: true,
      loop: false
    };
  }

  loadData(){
  this.entrepreneurshipsService.getEntrepreneurshipsRecents().subscribe(e =>{
    this.entrepreneurships = e.data;
  })
  }

  checkScreen(){
    if(window.innerWidth>=960){
        return 2.3;
    }else{
        return 1.1;
    }
  }

}
