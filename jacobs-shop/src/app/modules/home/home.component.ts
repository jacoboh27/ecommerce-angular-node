import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../admin/categories/_services/categories.service';
import { ProductService } from '../admin/products/_services/product.service';
import { URL_IMAGES } from 'src/app/config/config';
import { CartService } from './_services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  search:any = null;
  categories:any = [];
  categorie:any = '';
  products:any = [];
  URL_IMAGES:any = URL_IMAGES;
  listCarts:any = [];
  totalCarts:any = 0;

  constructor(
    public _productService:ProductService,
    public _categorieService:CategoriesService,
    public cartService: CartService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.allProducts();
    this._categorieService.allActiveCategories().subscribe((resp:any) => {
      this.categories = resp.categories;
    })
  }

  addCart(product: any){
    this.cartService.changeCart(product);
    //this.toastr.success('¡El producto se agregó al carrito exitosamente!');
  }

  allProducts() {
    this._productService.allActiveProducts(this.search, this.categorie).subscribe((resp:any) => {
      this.products = resp.products;
    })
  }

  refresh() {
    this.categorie = null;
    this.search = null;
    this.allProducts();
  }
}
