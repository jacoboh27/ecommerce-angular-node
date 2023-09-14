import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CategoriesRoutingModule } from './categories-routing.module';
// import { CategoriesComponent } from './categories.component';
// import { AddNewCategorieComponent } from './add-new-categorie/add-new-categorie.component';
// import { EditNewCategorieComponent } from './edit-new-categorie/edit-new-categorie.component';
// import { DeleteNewCategorieComponent } from './delete-new-categorie/delete-new-categorie.component';
// import { ListCategoriesComponent } from './list-categories/list-categories.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    //CategoriesComponent, 
    //ListCategoriesComponent,
    //AddNewCategorieComponent, 
    //EditNewCategorieComponent, 
    //DeleteNewCategorieComponent, 
  ],
  imports: [
    FormsModule,
    RouterModule,
    CommonModule,
    CategoriesRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    NgbModalModule,
  ],
  exports: [
  ]
})
export class CategoriesModule { }
