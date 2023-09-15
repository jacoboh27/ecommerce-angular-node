import { Component, OnInit } from '@angular/core';
import { URL_IMAGES } from 'src/app/config/config';
import { Router } from '@angular/router';
import { ProductService } from './_services/product.service';
import { CategoriesService } from '../categories/_services/categories.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products:any = [];
  productSelected:any = [];
  search:any = null;
  categorie:any = '';
  categories:any = [];
  URL_IMAGES:any = URL_IMAGES;

  constructor(
    public router:Router,
    public _productService:ProductService,
    public _categorieService:CategoriesService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.allProducts();
    this._categorieService.allCategories().subscribe((resp:any) => {
      console.log(resp);
      this.categories = resp.categories;
    })
  }

  allProducts() {
    this._productService.allProducts(this.search, this.categorie).subscribe((resp:any) => {
      console.log(resp);
      this.products = resp.products;
    })
  }

  refresh() {
    this.categorie = null;
    this.search = null;
    this.allProducts();
  }

  selectModalProduct(product: any){
    this.productSelected = product;
    //this.nameEditCategory = product.title;
    //this.stateEditCategory = product.state;
    //this.imagenPrevEditCategory = URL_BACKEND+'api/products/uploads/product/' + product.imagen;
  }

  editProduct(product:any) {
    this.router.navigateByUrl("admin/products/editar-producto/"+product._id);
  }

  deleteProduct() {
    this._productService.deleteProduct(this.productSelected._id).subscribe((resp:any) => {
      let index = this.products.findIndex((item:any) => item._id == this.productSelected._id);
      if(index != -1){
        this.products.splice(index,1);
      }
      this.toastr.success('¡El producto se eliminó exitosamente!');
    }, (error) => {
      if(error.error){
        this.toastr.error('¡Ocurrio un error!');
      }
    })
  }

}
