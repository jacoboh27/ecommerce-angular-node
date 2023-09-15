import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../categories/_services/categories.service';
import { ProductService } from '../_services/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.scss']
})
export class AddNewProductComponent implements OnInit {

  title:any = null;
  sku:any = null;
  categories:any = [];
  categorie:any = "";
  price_pesos:any = 0;   
  imagen_file:any = null;
  imagen_previzualizacion:any = null;
  description:any = null;
  state:any = 1;

  constructor(
    public _productService:ProductService,
    public _categorieService:CategoriesService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
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

  save() {
    if(!this.title || !this.categorie || !this.price_pesos || !this.description || !this.sku || !this.imagen_file) {
        this.toastr.error('¡Es necesario ingresar todos los campos!');
        return;
    }
    let formData = new FormData();
    formData.append("title", this.title);
    formData.append("categorie", this.categorie);
    formData.append("sku", this.sku);
    formData.append("price_pesos", this.price_pesos);
    formData.append("description", this.description);
    formData.append("state", this.state);
    formData.append("imagen", this.imagen_file);

    this._productService.createProduct(formData).subscribe((resp:any) => {
      console.log(resp);
      if (resp.code == 403){
        this.toastr.error('¡El nombre del producto ya existe, elige otro nombre!');
        return;
      } else {
        this.toastr.success('¡El producto se creó exitosamente!');
        this.title = null; 
        this.categorie = null;
        this.sku = null;
        this.price_pesos = null;
        this.description = null;
        this.state = 1;
        this.imagen_file = null;
        this.imagen_previzualizacion = null;
        return;
      }
    });
  }

}
