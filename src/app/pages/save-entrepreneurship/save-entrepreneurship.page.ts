import { EntrepreneurshipsService } from './../../services/entrepreneurships.service';
import { SubcategoriesService } from './../../services/subcategories.service';
import { TagsService } from './../../services/tags.service';
import { DistrictsService } from './../../services/districts.service';
import { CategoriesService } from './../../services/categories.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/interfaces/category.interface';
import { District, Subcategory } from 'src/app/interfaces/entrepreneurship.interface';
import { Tag } from 'src/app/interfaces/tag.interface';
import { createFormData } from 'src/app/helpers/form-data.helper';

@Component({
  selector: 'app-save-entrepreneurship',
  templateUrl: './save-entrepreneurship.page.html',
  styleUrls: ['./save-entrepreneurship.page.scss'],
})
export class SaveEntrepreneurshipPage implements OnInit {

  saveForm:FormGroup;
  logo:File;
  cover:File;
  categories:Category[] = [];
  subcategories:Subcategory[] = [];
  districts:District[] = [];
  tags:Tag[] = [];
  haveCategories = false;
  validation_messages = {
    'name': [
      { type: 'required', message: 'El nombre de tu negocio es requerido.' },
      { type: 'minlength', message: 'El nombre de tu negocio debe tener al menos 5 caracteres.' },
      { type: 'maxlength', message: 'El nombre de tu negocio debe tener como maximo 45 caracteres.' },
    ],
    'description': [
      { type: 'required', message: 'La description de tu negocio es requerida.' },
      { type: 'minlength', message: 'La description de tu negocio debe tener al menos 5 caracteres.' },
      { type: 'maxlength', message: 'La description de tu negocio debe tener como maximo 45 caracteres.' },
    ],
    'slogan': [
      { type: 'required', message: 'El eslogan de tu negocio es requerido.' },
      { type: 'minlength', message: 'El eslogan de tu negocio debe tener al menos 5 caracteres.' },
      { type: 'maxlength', message: 'El eslogan de tu negocio debe tener como maximo 45 caracteres.' },
    ],
    'subcategory': [
      { type: 'required', message: 'La subcategoria de tu negocio es requerida.' },
    ],
    'address': [
      // { type: 'required', message: 'El nombre de tu negocio es requerido.' },
      // { type: 'minlength', message: 'El nombre de tu negocio debe tener al menos 5 caracteres.' },
      // { type: 'maxlength', message: 'El nombre de tu negocio debe tener como maximo 45 caracteres.' },
    ],
    'district': [
      { type: 'required', message: 'El distrito de tu negocio es requerido.' },
    ],
    'phone': [
      { type: 'required', message: 'tu teléfono es requerida.' },
      { type: 'pattern', message: 'tu teléfono debe ser fijo o celular. Ejm: 074490954 ó 987654321.' }
    ],
    'logo': [
      { type: 'required', message: 'El logo de tu negocio es requerido.' },
    ],
    'cover': [
      { type: 'required', message: 'La portada de tu negocio es requerida.' },
    ],
    'facebook': [
      // { type: 'required', message: 'El nombre de tu negocio es requerido.' },
    ],
    'twitter': [
      // { type: 'required', message: 'El nombre de tu negocio es requerido.' },
    ],
    'youtube': [
      // { type: 'required', message: 'El nombre de tu negocio es requerido.' },
    ],
    'instagram': [
      // { type: 'required', message: 'El nombre de tu negocio es requerido.' },
    ],
    'tiktok': [
      // { type: 'required', message: 'El nombre de tu negocio es requerido.' },
    ],
  }

  constructor(
    private formBuilder:FormBuilder,
    private entrepreneurshipsService:EntrepreneurshipsService,
    private categoriesService:CategoriesService,
    private subcategoriesService:SubcategoriesService,
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
      address:[''],
      district:['',[Validators.required]],
      logo:['',Validators.required],
      cover:['',Validators.required],
      facebook:[''],
      twitter:[''],
      youtube:[''],
      instagram:[''],
      tiktok:[''],
    });
    this.categories = await this.categoriesService.getCategories();
    this.districts = await this.districtsService.getDistricts();
    this.tags = await this.tagsService.getTags();
  }

  obtenerLogo($event){
    this.logo = $event.target.files[0];
  }

  obtenerCover($event){
    this.cover = $event.target.files[0];
  }

  async categoryChange(event){
    this.haveCategories = false;
    this.subcategories = await this.subcategoriesService.searchSubcategoriesByCategory(event.detail.value);
    this.saveForm.value.subcategory = null;
    this.haveCategories = true;
  }

  async save(){
    let data = {};
    let tagIds = [];
    for(let field in this.saveForm.value){
      if(this.saveForm.value[field]) data[field] = this.saveForm.value[field];
    }
    this.tags.forEach(t => {
      if(t.checked) tagIds.push(t.id)
    });
    data["logo"] = this.logo;
    data["cover"] = this.cover;
    data["tags"] = tagIds;
    const entrepreneurship = createFormData(data);
    await this.entrepreneurshipsService.createEntrepeurship(entrepreneurship);
  }

}
