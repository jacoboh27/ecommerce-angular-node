import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { URL_SERVICIOS } from 'src/app/config/config';
import { AuthService } from '../../../auth-profile/_services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  constructor(
    private http: HttpClient,
    public authservice: AuthService,
  ) { }
  
  allProducts(search='',categorie=null) {
    let headers = new HttpHeaders({'token': this.authservice.token});
    let LINK = "";
    if (search){
      LINK+= "?search=" + search;
    } else {
      LINK+= "?search=";
    }
    if (categorie){
      LINK+= "&categorie=" + categorie;
    } else {
      LINK+= "&categorie=";
    }
    let URL = URL_SERVICIOS + "/products/list" + LINK;
    return this.http.get(URL, {headers: headers});
  }

  allActiveProducts(search='',categorie=null) {
    let LINK = "";
    if (search){
      LINK+= "?search=" + search;
    } else {
      LINK+= "?search=";
    }
    if (categorie){
      LINK+= "&categorie=" + categorie;
    } else {
      LINK+= "&categorie=";
    }
    let URL = URL_SERVICIOS + "/products/list_active" + LINK;
    return this.http.get(URL);
  }
  
  showProduct(product_id='') {
    let headers = new HttpHeaders({'token': this.authservice.token});
    let URL = URL_SERVICIOS + "/products/show/" + product_id;
    return this.http.get(URL, {headers: headers});
  }

  createProduct(data:any) {
    let headers = new HttpHeaders({'token': this.authservice.token});
    let URL = URL_SERVICIOS + "/products/register";
    return this.http.post(URL, data, {headers: headers});
  }

  updateProduct(data:any) {
    let headers = new HttpHeaders({'token': this.authservice.token});
    let URL = URL_SERVICIOS + "/products/update";
    return this.http.put(URL, data, {headers: headers});
  }

  deleteProduct(product_id:any) {
    let headers = new HttpHeaders({'token': this.authservice.token});
    let URL = URL_SERVICIOS + "/products/delete?_id=" + product_id;
    return this.http.delete(URL,{headers: headers});
  }

}
