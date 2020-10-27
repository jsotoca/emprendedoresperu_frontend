import { UiService } from './../../services/ui.service';
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
  tagIds = [];
  haveCategories = false;
  validation_messages = {
    'name': [
      { type: 'required', message: 'El nombre de tu negocio es requerido.' },
      { type: 'minlength', message: 'El nombre de tu negocio debe tener al menos 3 caracteres.' },
      { type: 'maxlength', message: 'El nombre de tu negocio debe tener como maximo 145 caracteres.' },
    ],
    'description': [
      { type: 'required', message: 'La descripción de tu negocio es requerida.' },
      { type: 'minlength', message: 'La descripción de tu negocio debe tener al menos 10 caracteres.' },
      { type: 'maxlength', message: 'La descripción de tu negocio debe tener como maximo 500 caracteres.' },
    ],
    'slogan': [
      { type: 'required', message: 'El eslogan de tu negocio es requerido.' },
      { type: 'minlength', message: 'El eslogan de tu negocio debe tener al menos 10 caracteres.' },
      { type: 'maxlength', message: 'El eslogan de tu negocio debe tener como maximo 500 caracteres.' },
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
      { type: 'required', message: 'tu teléfono es requerido.' },
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
    private tagsService:TagsService,
    private uiService:UiService
  ) { }

  async ionViewDidEnter(){
    this.categories = [];
    this.subcategories = [];
    this.tags = [];
    this.tagIds = [];
    this.districts = [];
    this.haveCategories = false;
    this.saveForm.reset();
    this.categories = await this.categoriesService.getCategories();
    this.districts = await this.districtsService.getDistricts();
    this.tags = await this.tagsService.getTags();
  }

  async ngOnInit() {
    this.saveForm = this.formBuilder.group({
      name:['',[Validators.required, Validators.minLength(3),Validators.maxLength(145)]],
      description:['',[Validators.required, Validators.minLength(10),Validators.maxLength(500)]],
      slogan:['',[Validators.required, Validators.minLength(10),Validators.maxLength(500)]],
      phone:['',[Validators.required, Validators.pattern("[0-9]{9}")]],
      subcategory:['',[Validators.required]],
      category:[''],
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
  }

  obtenerLogo($event){
    let invalido:boolean = false;
    if($event.target.files[0].size>4194304){
      this.uiService.showMessage('Archivo demasiado grande','el máximo permitido es de 4MB');
      invalido = true;
      $event.target.value = '';
    }
    if($event.target.files[0].type.indexOf("image")==-1){
      this.uiService.showMessage('Formato de imagen incorrecto','El archivo que ingresaste no es una imagen');
      invalido = true;
      $event.target.value = '';
    }  
    if(!invalido) this.logo = $event.target.files[0];
  }

  obtenerCover($event){
    let invalido:boolean = false;
    if($event.target.files[0].size>4194304){
      this.uiService.showMessage('Archivo demasiado grande','el máximo permitido es de 4MB');
      invalido = true;
      $event.target.value = '';
    }
    if($event.target.files[0].type.indexOf("image")==-1){
      this.uiService.showMessage('Formato de imagen incorrecto','El archivo que ingresaste no es una imagen');
      invalido = true;
      $event.target.value = '';
    }  
    if(!invalido) this.cover = $event.target.files[0];
  }

  async categoryChange(event){
    this.haveCategories = false;
    if(event.detail.value)this.subcategories = await this.subcategoriesService.searchSubcategoriesByCategory(event.detail.value);
    this.saveForm.value.subcategory = null;
    this.haveCategories = true;
  }

  async save(){
    let data = {};
    let flag = false;
    for(let field in this.saveForm.value){
      if(this.saveForm.value[field]) data[field] = this.saveForm.value[field];
    }
    this.tags.forEach(t => {
      if(t.checked){
        this.tagIds.push(t.id);
        flag = true;
      } 
    });
    if(flag){
      data["logo"] = this.logo;
      data["cover"] = this.cover;
      data["tags"] = this.tagIds;
      const entrepreneurship = createFormData(data);
      await this.uiService.showLoading(`guardando los datos de tu negocio 🚀`);
      try {
        await this.entrepreneurshipsService.createEntrepeurship(entrepreneurship);
        await this.uiService.dismissLoading();
        this.saveForm.reset();
        this.uiService.routeTo('/account');
      } catch (error) {
        await this.uiService.dismissLoading();
      }
    }else{
      this.uiService.showMessage("No seleccionaste etiquetas","Es necesario que selecciones una etiqueta que describa tu emprendimiento.");
    }
  }

}
