import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { URL_BACKEND } from 'src/app/config/config';
import { AddNewCategorieComponent } from '../add-new-categorie/add-new-categorie.component';
import { DeleteNewCategorieComponent } from '../delete-new-categorie/delete-new-categorie.component';
import { EditNewCategorieComponent } from '../edit-new-categorie/edit-new-categorie.component';
import { CategoriesService } from '../_services/categories.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.scss']
})
export class ListCategoriesComponent implements OnInit {

  categories:any = [];
  search:any = "";
  imagen_file:any = null;
  imagen_previzualizacion:any = null;
  name:any = null;

  URL_BACKEND:any = URL_BACKEND;
  constructor(
    public _categorieService: CategoriesService,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.allCategories();
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
  // openCreate(){ 
  //   const modalRef = this.modalService.open(AddNewCategorieComponent,{centered:true, size: 'md'});

  //   modalRef.componentInstance.CategorieC.subscribe((categorie:any) => {
  //     this.categories.unshift(categorie);
  //   })
  // }

  processFile($event:any){
    console.log($event.target);
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

  save(){
    console.log(this.name);
    if(!this.name || !this.imagen_file){
      this.toastr.warning('¡Es necesario ingresar todos los campos!');
      return;
    }
    let formData = new FormData();
    formData.append('title', this.name);
    formData.append('imagen', this.imagen_file);

    // 
    this._categorieService.createCategorie(formData).subscribe((resp:any) => {
      this.toastr.success('¡Nueva categoría registrada exitosamente!');
      this.categories.unshift(resp);
    })
  }

  
  editCategorie(categorie: any){
    // const modalRef = this.modalService.open(EditNewCategorieComponent,{centered:true, size: 'md'});
    // modalRef.componentInstance.categorie_selected = categorie;

    // modalRef.componentInstance.CategorieE.subscribe((categorie:any) => {
    //   let index = this.categories.findIndex((item: any) => item._id == categorie._id);
    //   if(index != -1){
    //     this.categories[index] = categorie;
    //   }
    // })
  }

  delete(categorie: any){
    // const modalRef = this.modalService.open(DeleteNewCategorieComponent,{centered:true, size: 'md'});
    // modalRef.componentInstance.categorie_selected = categorie;

    // modalRef.componentInstance.CategorieD.subscribe((resp:any) => {
    //   let index = this.categories.findIndex((item:any) => item._id == categorie._id);
    //   if(index != -1){
    //     this.categories.splice(index,1);
    //   }
    // })
  }

}
