import { Component, OnInit } from '@angular/core';
import { URL_BACKEND } from 'src/app/config/config';
import { CategoriesService } from './_services/categories.service';
import { ToastrService } from 'ngx-toastr';
import { Modal } from 'flowbite';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categories:any = [];
  categorySelected:any = [];
  search:any = "";
  imagen_file:any = null;
  imagen_previzualizacion:any = null;
  nameNewCategory:any = null;
  nameEditCategory:any = null;
  stateEditCategory:any = null;
  imagenPrevEditCategory:any = null;
  imagenFileEditCategory:any = null;

  editModal: any = null;
  deleteModal: any = null;
  newModal: any = null;

  URL_BACKEND:any = URL_BACKEND;
  constructor(
    public _categorieService: CategoriesService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.allCategories();
    this.editModal = new Modal(document.getElementById('editCategorieModal'));
    this.deleteModal = new Modal(document.getElementById('deleteCategorieModal'));
    this.newModal = new Modal(document.getElementById('newCategorieModal'));
  }
  allCategories(){
    this._categorieService.allCategories(this.search).subscribe((resp:any) => {
      this.categories = resp.categories;
    })
  }
  refresh(){
    this.search = "";
    this.allCategories();
  }

  processFile($event:any){
    if($event.target.files[0].type.indexOf("image") < 0){
      this.imagen_previzualizacion = null;
      this.toastr.error('¡Debes subir un archivo de tipo imagen!');
      return;
    }
    this.imagen_file = $event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(this.imagen_file);
    reader.onloadend = () => this.imagen_previzualizacion = reader.result;
  }
  saveNewCategory(){
    if(!this.nameNewCategory || !this.imagen_file){
      this.toastr.warning('¡Es necesario ingresar todos los campos!');
      return;
    }
    let formData = new FormData();
    formData.append('title', this.nameNewCategory);
    formData.append('imagen', this.imagen_file);
    this._categorieService.createCategorie(formData).subscribe((resp:any) => {
      this.toastr.success('¡Nueva categoría registrada exitosamente!');
      this.categories.unshift(resp);
    })
    this.closeModal('new');
  }

  showModal(categorie: any, option: string){
    if (option == 'edit') {
      this.editModal.show();
      this.selectModalCategory(categorie);
    } else if (option == 'delete') {
      this.deleteModal.show();
      this.selectModalCategory(categorie);
    } else if (option == 'new'){
      this.newModal.show();
    }
  }

  closeModal(option: string){
    if (option == 'edit') {
      this.editModal.hide();
    } else if (option == 'delete') {
      this.deleteModal.hide();
    } else if (option == 'new'){
      this.newModal.hide();
    }
  }

  selectModalCategory(categorie: any){
    this.categorySelected = categorie;
    this.nameEditCategory = categorie.title;
    this.stateEditCategory = categorie.state;
    this.imagenPrevEditCategory = URL_BACKEND+'api/categories/uploads/categorie/' + categorie.imagen;
  }

  processFileEdit($event:any){
    if($event.target.files[0].type.indexOf("image") < 0){
      this.imagenPrevEditCategory = null;
      this.toastr.error('¡Debes subir un archivo de tipo imagen!');
      return;
    }
    this.imagenFileEditCategory = $event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(this.imagenFileEditCategory);
    reader.onloadend = () => this.imagenPrevEditCategory = reader.result;
  }
  saveEditCategory() {
    if(!this.nameEditCategory){
      this.toastr.error('¡Debes ingresar un nombre para la categoría!');
      return;
    }
    let formData = new FormData();
    formData.append('_id', this.categorySelected._id);
    formData.append('title', this.nameEditCategory);
    formData.append('state', this.stateEditCategory);
    if(this.imagenFileEditCategory){
      formData.append('image', this.imagenFileEditCategory);
    }
    this._categorieService.updateCategorie(formData).subscribe((resp:any) => {
      let index = this.categories.findIndex((item: any) => item._id == this.categorySelected._id);
      if(index != -1){
        this.categories[index] = resp.categorie;
      }
      this.toastr.success('¡La categoría se editó exitosamente!');
      this.closeModal('edit');
    })
  }

  deleteCategory() {
    this._categorieService.deleteCategorie(this.categorySelected._id).subscribe((resp:any) => {
      let index = this.categories.findIndex((item:any) => item._id == this.categorySelected._id);
      if(index != -1){
        this.categories.splice(index,1);
      }
      this.toastr.success('¡La categoría se eliminó exitosamente!');
    }, (error) => {
      if(error.error){
        this.toastr.error('¡Ocurrio un error!');
      }
    });
    this.closeModal('delete');
  }

}