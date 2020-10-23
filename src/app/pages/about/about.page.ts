import { Component, OnInit } from '@angular/core';

interface Iteam {
  name:string,
  photo:string
}

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  team:Iteam[] = [
    {
      name:'Malena del Rosario Chinchay Arancibia',
      photo: '../../../assets/team/malena.jpg'
    },
    {
      name:'Jessenia Maybel Hernandez Zurita',
      photo: '../../../assets/team/jessenia.jpg'
    },
    {
      name:'Francia Veliz Yamunaque',
      photo: '../../../assets/team/francia.jpg'
    },
    {
      name:'Jorge Velasquez Granda',
      photo: '../../../assets/team/jorge.png'
    },
    {
      name:'Kiara Mirelli Oyola espinoza',
      photo: '../../../assets/team/kiara.jpg'
    },
    {
      name:'Juan Antonio Soto Cabrera',
      photo: '../../../assets/team/antonio.jpg'
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
