import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CategoriesService } from 'src/app/modules/admin/categories/_services/categories.service';
import { CartService } from 'src/app/modules/home/_services/cart.service';
import { URL_IMAGES } from 'src/app/config/config';

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
  checkoutSideMenuOpen:boolean = false;
  shoppingCartCounter: number = 0;
  shoppingCartProducts: any = [];
  shoppingCartTotalPrice: number = 0;
  URL_IMAGES:any = URL_IMAGES;

  constructor(
    private router: Router,
    public _serviceCategorie: CategoriesService,
    public cartService: CartService,
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
    this.cartService.currentDataCart$.subscribe((resp: any) => {
      this.shoppingCartProducts = resp;
      this.shoppingCartCounter = resp.length;
      this.totalPrice();
    })
  }

  closeCheckoutSideMenu(){
    this.checkoutSideMenuOpen = false;
  }

  openCheckoutSideMenu(){
    this.checkoutSideMenuOpen = true;
  }

  allActiveCategories(){
    this._serviceCategorie.allActiveCategories().subscribe((resp:any) => {
      this.categories = resp.categories;
    })
  }

  setSearchByCategory(category: string): void {
  }

  userLoggedIn() {
    this.parsedAccount = JSON.parse(localStorage.getItem('user')!);
    this.hasUserAnAccount = !!this.parsedAccount;
  }

  totalPrice() {
    this.shoppingCartTotalPrice = 0;
    this.shoppingCartProducts.forEach((product: any) => {
      this.shoppingCartTotalPrice+= (product.price_pesos * product.total);
    });
  }

  increaseTotal(_id: string){
    let index = this.shoppingCartProducts.findIndex((item: any) => item._id == _id);
    if (index != -1) {
      this.shoppingCartProducts[index].total = this.shoppingCartProducts[index].total + 1;
      this.totalPrice();
    }
  }

  deincrementTotal(_id: string){
    let index = this.shoppingCartProducts.findIndex((item: any) => item._id == _id);
    if (index != -1) {
      this.shoppingCartProducts[index].total = this.shoppingCartProducts[index].total - 1;
      if (this.shoppingCartProducts[index].total == 0) {
        this.shoppingCartProducts.splice(index, 1);
      }
      this.totalPrice();
    }
  }

  removeItemShoppingCart(_id: string) {
    let index = this.shoppingCartProducts.findIndex((item: any) => item._id == _id);
    if (index != -1) {
      this.shoppingCartProducts.splice(index, 1);
      this.totalPrice();
    }
  }

  signOff(){
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    this.router.navigate(["/auth/login"]);
  }

}
