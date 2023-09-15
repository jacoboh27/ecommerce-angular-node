import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CategoriesService } from 'src/app/modules/admin/categories/_services/categories.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  activeRoute: string = '';
  hasUserAnAccount: boolean = false;
  parsedAccount: any = [];
  categories: any = [];

  constructor(
    private router: Router,
    public _serviceCategorie: CategoriesService,
  ) {
    router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(() => {
      this.activeRoute = router.url;
    });
  }

  ngOnInit(): void {
    this.userLoggedIn(); 
    this.allActiveCategories();
  }

  allActiveCategories(){
    this._serviceCategorie.allActiveCategories().subscribe((resp:any) => {
      this.categories = resp.categories;
    })
  }

  setSearchByCategory(category: string): void {
    console.log("category", category);
  }

  userLoggedIn(){
    this.parsedAccount = JSON.parse(localStorage.getItem('user')!);
    this.hasUserAnAccount = !!this.parsedAccount;
  }

}
