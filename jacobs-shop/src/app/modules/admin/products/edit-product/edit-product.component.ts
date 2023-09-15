import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from '../../categories/_services/categories.service';
import { ProductService } from '../_services/product.service';
import { ToastrService } from 'ngx-toastr';
import { URL_IMAGES } from 'src/app/config/config';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  product_id:any = null;
  product_selected:any = null;

  title:any = null;
  sku:any = null;
  categories:any = [];
  categorie:any = "";
  price_pesos:any = 0; 
  imagen_file:any= null;
  imagen_previzualizacion:any = null;
  description:any = null;
  stock:any = 0;
  state:any = 1;
  URL_IMAGES:any = URL_IMAGES;

  constructor(
    public _productService:ProductService,
    public router:Router,
    public _categorieService:CategoriesService,
    public activeRouter:ActivatedRoute,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.activeRouter.params.subscribe((resp:any) => {
      this.product_id = resp.id;
    });

    this._productService.showProduct(this.product_id).subscribe((resp:any) => {
      this.product_selected = resp.product;
      this.title = this.product_selected.title;
      this.sku = this.product_selected.sku;
      this.categorie = this.product_selected.categorie._id;
      this.price_pesos = this.product_selected.price_pesos;
      this.stock = this.product_selected.stock;
      this.imagen_previzualizacion = this.product_selected.imagen;
      this.description = this.product_selected.description;
      this.state = this.product_selected.state;
    })

    this._categorieService.allCategories().subscribe((resp:any) => {
      this.categories = resp.categories;
    })
  }

  processFile($event: any){
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

  update(){
    if(!this.title || !this.categorie || !this.price_pesos || !this.description || !this.sku) {
      this.toastr.error('¡Es necesario ingresar todos los campos!');
      return;
    }
    let formData = new FormData();
    formData.append("_id", this.product_id);
    formData.append("title", this.title);
    formData.append("categorie", this.categorie);
    formData.append("sku", this.sku);
    formData.append("price_pesos", this.price_pesos);
    formData.append("description", this.description);
    formData.append("stock", this.stock);
    formData.append("state",this.state);
    if(this.imagen_file) {
      formData.append("imagen",this.imagen_file);
    }

    this._productService.updateProduct(formData).subscribe((resp:any) => {
      if(resp.code == 403){
        this.toastr.error('¡El nombre del producto ya existe, elige otro nombre!');
        return;
      }else{
        this.toastr.success('¡El producto se creó exitosamente!');
        this.listProducts();
        return;
      }
    })

  }

  listProducts() {
    this.router.navigateByUrl("admin/products");
  }

}