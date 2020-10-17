import { TagsService } from './../../services/tags.service';
import { DistrictsService } from './../../services/districts.service';
import { CategoriesService } from './../../services/categories.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/interfaces/category.interface';
import { District } from 'src/app/interfaces/entrepreneurship.interface';
import { Tag } from 'src/app/interfaces/tag.interface';

@Component({
  selector: 'app-save-entrepreneurship',
  templateUrl: './save-entrepreneurship.page.html',
  styleUrls: ['./save-entrepreneurship.page.scss'],
})
export class SaveEntrepreneurshipPage implements OnInit {

  saveForm:FormGroup;
  imagen:File;
  cover:File;
  categories:Category[] = [];
  districts:District[] = [];
  tags:Tag[] = [];
  validation_messages = {
    'name': [
      { type: 'required', message: 'El nombre de tu negocio es requerido.' },
      { type: 'minlength', message: 'El nombre de tu negocio debe tener al menos 5 caracteres.' },
      { type: 'maxlength', message: 'El nombre de tu negocio debe tener como maximo 45 caracteres.' },
    ],
    'description': [
      { type: 'required', message: 'El nombre de tu negocio es requerido.' },
      { type: 'minlength', message: 'El nombre de tu negocio debe tener al menos 5 caracteres.' },
      { type: 'maxlength', message: 'El nombre de tu negocio debe tener como maximo 45 caracteres.' },
    ],
    'slogan': [
      { type: 'required', message: 'El nombre de tu negocio es requerido.' },
      { type: 'minlength', message: 'El nombre de tu negocio debe tener al menos 5 caracteres.' },
      { type: 'maxlength', message: 'El nombre de tu negocio debe tener como maximo 45 caracteres.' },
    ],
    'subcategory': [
      { type: 'required', message: 'El nombre de tu negocio es requerido.' },
    ],
    'address': [
      { type: 'required', message: 'El nombre de tu negocio es requerido.' },
      { type: 'minlength', message: 'El nombre de tu negocio debe tener al menos 5 caracteres.' },
      { type: 'maxlength', message: 'El nombre de tu negocio debe tener como maximo 45 caracteres.' },
    ],
    'district': [
      { type: 'required', message: 'El nombre de tu negocio es requerido.' },
    ],
    'phone': [
      { type: 'required', message: 'tu teléfono es requerida.' },
      { type: 'pattern', message: 'tu teléfono debe ser fijo o celular. Ejm: 074490954 ó 987654321.' }
    ],
    'logo': [
      { type: 'required', message: 'El nombre de tu negocio es requerido.' },
    ],
    'cover': [
      { type: 'required', message: 'El nombre de tu negocio es requerido.' },
    ],
    'facebook': [
      { type: 'required', message: 'El nombre de tu negocio es requerido.' },
    ],
    'twitter': [
      { type: 'required', message: 'El nombre de tu negocio es requerido.' },
    ],
    'youtube': [
      { type: 'required', message: 'El nombre de tu negocio es requerido.' },
    ],
    'instagram': [
      { type: 'required', message: 'El nombre de tu negocio es requerido.' },
    ],
    'tiktok': [
      { type: 'required', message: 'El nombre de tu negocio es requerido.' },
    ],
  }

  constructor(
    private formBuilder:FormBuilder,
    private categoriesService:CategoriesService,
    private districtsService:DistrictsService,
    private tagsService:TagsService
  ) { }

  async ngOnInit() {
    this.saveForm = this.formBuilder.group({
      name:['',[Validators.required, Validators.minLength(3),Validators.maxLength(45)]],
      description:['',[Validators.required, Validators.minLength(10),Validators.maxLength(145)]],
      slogan:['',[Validators.required, Validators.minLength(10),Validators.maxLength(145)]],
      phone:['',[Validators.required, Validators.pattern("[0-9]{9}")]],
      subcategory:['',[Validators.required]],
      address:['',[Validators.required]],
      district:['',[Validators.required]],
      logo:['',Validators.required],
      cover:['',Validators.required],
      facebook:['',Validators.required],
      twitter:['',Validators.required],
      youtube:['',Validators.required],
      instagram:['',Validators.required],
      tiktok:['',Validators.required],
    });
    this.categories = await this.categoriesService.getCategories();
    this.districts = await this.districtsService.getDistricts();
    this.tags = await this.tagsService.getTags();
  }

  obtenerLogo($event){
    this.imagen = $event.target.files[0];
  }

  obtenerCover($event){
    this.imagen = $event.target.files[0];
  }

  save(){}

}
