import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { CategoriesComponent } from './categories/categories.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { ListCategoriesComponent } from './categories/list-categories/list-categories.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'home',
        component: AdminHomeComponent
      },
      // {
      //   path: 'categories',
      //   component: CategoriesComponent
      // },
      {
        path: 'categories/list',
        component: ListCategoriesComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
