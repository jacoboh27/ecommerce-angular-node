import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { CategoriesComponent } from './categories/categories.component';
import { AddNewCategorieComponent } from './categories/add-new-categorie/add-new-categorie.component';
import { EditNewCategorieComponent } from './categories/edit-new-categorie/edit-new-categorie.component';
import { DeleteNewCategorieComponent } from './categories/delete-new-categorie/delete-new-categorie.component';
import { ListCategoriesComponent } from './categories/list-categories/list-categories.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    AdminComponent,
    AdminHomeComponent,
    //CategoriesComponent,
    ListCategoriesComponent,
    AddNewCategorieComponent, 
    EditNewCategorieComponent, 
    DeleteNewCategorieComponent,
  ],
  imports: [
    AdminRoutingModule,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    MatButtonModule,
    MatDialogModule,
  ]
})
export class AdminModule { }
