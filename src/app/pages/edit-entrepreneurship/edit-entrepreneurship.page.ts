import { UiService } from './../../services/ui.service';
import { TagsService } from './../../services/tags.service';
import { DistrictsService } from './../../services/districts.service';
import { SubcategoriesService } from './../../services/subcategories.service';
import { CategoriesService } from './../../services/categories.service';
import { EntrepreneurshipsService } from './../../services/entrepreneurships.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/interfaces/category.interface';
import { District, Entrepreneurship, Subcategory} from 'src/app/interfaces/entrepreneurship.interface';
import { Tag } from 'src/app/interfaces/tag.interface';
import { createFormData } from 'src/app/helpers/form-data.helper';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-entrepreneurship',
  templateUrl: './edit-entrepreneurship.page.html',
  styleUrls: ['./edit-entrepreneurship.page.scss'],
})
export class EditEntrepreneurshipPage implements OnInit {

  id:string;
  entrepreneurship:Entrepreneurship;
  saveForm:FormGroup;
  logo:File;
  cover:File;
  logo_preview:any;
  cover_preview:any;
  categories:Category[] = [];
  category:Category = {
    id:1,
    name:'',
    icon:'',
    image:''
  };
  subcategories:Subcategory[] = [];
  subcategory:Subcategory= {
    id:0,
    name:'',
    icon:'',
    image:''
  };
  districts:District[] = [];
  district:District = {
    id:0,
    district:''
  }
  tags:Tag[] = [];
  haveCategories = false;
  selectedDistrict = 0;
  selectedSubcategory = 0;
  validation_messages = {
    'name': [
      { type: 'required', message: 'El nombre de tu negocio es requerido.' },
      { type: 'minlength', message: 'El nombre de tu negocio debe tener al menos 3 caracteres.' },
      { type: 'maxlength', message: 'El nombre de tu negocio debe tener como maximo 145 caracteres.' },
    ],
    'description': [
      { type: 'required', message: 'La description de tu negocio es requerida.' },
      { type: 'minlength', message: 'La description de tu negocio debe tener al menos 10 caracteres.' },
      { type: 'maxlength', message: 'La description de tu negocio debe tener como maximo 145 caracteres.' },
    ],
    'slogan': [
      { type: 'required', message: 'El eslogan de tu negocio es requerido.' },
      { type: 'minlength', message: 'El eslogan de tu negocio debe tener al menos 10 caracteres.' },
      { type: 'maxlength', message: 'El eslogan de tu negocio debe tener como maximo 145 caracteres.' },
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
    private tagsService:TagsService,
    private uiService:UiService,
    public activatedRoute: ActivatedRoute
  ) { 
    
  }

  getId(){
    return new Promise<string>((resolve)=>{
      this.activatedRoute.queryParams.subscribe(params => {
        resolve(params['id'] as string); 
      });
    });
  }

  async ngOnInit() {
    this.saveForm = this.formBuilder.group({
      name:['',[Validators.required, Validators.minLength(3),Validators.maxLength(145)]],
      description:['',[Validators.required, Validators.minLength(10),Validators.maxLength(145)]],
      slogan:['',[Validators.required, Validators.minLength(10),Validators.maxLength(145)]],
      phone:['',[Validators.required, Validators.pattern("[0-9]{9}")]],
      subcategory:['',[Validators.required]],
      address:[''],
      district:['',[Validators.required]],
      logo:['',[Validators.required]],
      cover:['',[Validators.required]],
      facebook:[''],
      twitter:[''],
      youtube:[''],
      instagram:[''],
      tiktok:[''],
    });
    this.categories = await this.categoriesService.getCategories();
    this.districts = await this.districtsService.getDistricts();
    this.tags = await this.tagsService.getTags();
    this.selectedDistrict = 1;
  }

  async ionViewDidEnter(){
    this.uiService.showLoading('cargando los datos.');
    this.id = null;
    this.entrepreneurship = null;
    this.id = await this.getId();
    this.entrepreneurship = await  this.entrepreneurshipsService.searchEntrepreneurship(this.id);
    console.log(this.entrepreneurship);
    this.logo_preview = this.entrepreneurship.logo;
    this.cover_preview = this.entrepreneurship.cover;
    this.selectedDistrict = this.entrepreneurship.district.id;
    const { category } = await this.subcategoriesService.searchSubcategory(this.entrepreneurship.subcategory.id);
    this.category = category;
    await this.categoryChange(null,this.category.id);
    this.subcategory = this.entrepreneurship.subcategory;
    this.district = this.entrepreneurship.district;
    this.marcarTags();
    this.saveForm.setValue({
      name:this.entrepreneurship.name,
      description:this.entrepreneurship.description,
      slogan:this.entrepreneurship.slogan,
      phone:this.entrepreneurship.phone,
      subcategory:this.entrepreneurship.subcategory,
      address:this.entrepreneurship.address,
      logo:this.entrepreneurship.logo,
      cover:this.entrepreneurship.logo,
      district:this.entrepreneurship.district,
      facebook:this.entrepreneurship.facebook,
      twitter:this.entrepreneurship.twitter,
      youtube:this.entrepreneurship.youtube,
      instagram:this.entrepreneurship.instagram,
      tiktok:this.entrepreneurship.tiktok,
    });
    this.uiService.dismissLoading();
  }

  obtenerLogo($event){
    if ($event.target.files && $event.target.files[0]) {
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
      if(!invalido) {
        this.logo = $event.target.files[0];
        let reader = new FileReader();
          reader.onload = ($event:any) => {
            this.logo_preview = $event.target.result;
          }
        reader.readAsDataURL($event.target.files[0]);
      }
    }else {
      this.logo = null;
      this.saveForm.controls.logo.setValue(this.entrepreneurship.logo);
      this.logo_preview = this.entrepreneurship.logo;
    }
  }

  obtenerCover($event){
    if ($event.target.files && $event.target.files[0]) {
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
      if(!invalido) {
        this.cover = $event.target.files[0];
        let reader = new FileReader();
          reader.onload = ($event:any) => {
            this.cover_preview = $event.target.result;
          }
          reader.readAsDataURL($event.target.files[0]);
      }
    }else {
      this.cover = null;
      this.saveForm.controls.cover.setValue(this.entrepreneurship.cover);
      this.cover_preview = this.entrepreneurship.cover;
    }
  }

  async categoryChange(event:any,id?){
    this.haveCategories = false;
    if(event)this.subcategories = await this.subcategoriesService.searchSubcategoriesByCategory(event.detail.value);
    else this.subcategories = await this.subcategoriesService.searchSubcategoriesByCategory(id);
    this.saveForm.value.subcategory = null;
    this.haveCategories = true;
  }

  marcarTags(){
    for (let i = 0; i < this.tags.length; i++) {
      this.tags[i].checked = false;
    }
    for (let i = 0; i < this.tags.length; i++) {
      const idx = this.entrepreneurship.tags.findIndex(e => e.id == this.tags[i].id);
      if(idx != -1) this.tags[i].checked = true;
      
    }
  }

  async save(){
    let data = {};
    let tagIds = [];
    let flag:boolean = false;

    for(let field in this.saveForm.value){
      if(this.saveForm.value[field]) data[field] = this.saveForm.value[field];
    }
    this.tags.forEach(t => {
      if(t.checked){
        tagIds.push(t.id)
        flag = true;
      } 
    });
    if(flag){
      if(this.logo){
        data["urlLogo"] = this.entrepreneurship.logo;
        data["logo"] = this.logo;
      } else{
        delete data["urlLogo"];
        data["logo"] = this.entrepreneurship.logo;
      }
      if(this.cover){
        data["urlCover"] = this.entrepreneurship.cover;
        data["cover"] = this.cover;
      }else{
        delete data["urlCover"];
        data["cover"] = this.entrepreneurship.cover;
      }
      data["tags"] = tagIds;
      data["id"] = this.entrepreneurship.id;
      const entrepreneurship = createFormData(data);
      await this.uiService.showLoading(`guardando los datos de tu negocio 🚀`);
      try {
        await this.entrepreneurshipsService.editEntrepeurship(entrepreneurship);
        await this.uiService.dismissLoading();
        this.uiService.showToast('Se editarón los datos con exito.');
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
