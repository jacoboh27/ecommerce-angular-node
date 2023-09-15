import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { URL_SERVICIOS } from 'src/app/config/config';
import { AuthService } from '../../../auth-profile/_services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(
    private http: HttpClient,
    public authservice: AuthService,
  ) { }
  
  allCategories(search=''){
    let headers = new HttpHeaders({'token': this.authservice.token});
    let URL = URL_SERVICIOS+"/categories/list?search="+search;
    return this.http.get(URL,{headers: headers});
  }

  allActiveCategories(){
    let URL = URL_SERVICIOS+"/categories/list_active";
    return this.http.get(URL);
  }

  createCategorie(data:any){
    let headers = new HttpHeaders({'token': this.authservice.token});
    let URL = URL_SERVICIOS+"/categories/register";
    return this.http.post(URL,data,{headers: headers});
  }

  updateCategorie(data:any){
    let headers = new HttpHeaders({'token': this.authservice.token});
    let URL = URL_SERVICIOS+"/categories/update";
    return this.http.put(URL,data,{headers: headers});
  }

  deleteCategorie(categorie_id:any){
    let headers = new HttpHeaders({'token': this.authservice.token});
    let URL = URL_SERVICIOS+"/categories/delete?_id="+categorie_id;
    return this.http.delete(URL,{headers: headers});
  }
}
