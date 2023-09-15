import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cart = new BehaviorSubject<Array<any>>([]);
  public currentDataCart$ = this.cart.asObservable();
  constructor() { }

  changeCart(DATACART: any){
    let listCart = this.cart.getValue();
    let index = listCart.findIndex((item: any) => item._id == DATACART._id);
    if (index != -1) {
      listCart[index].total = listCart[index].total + 1;
    } else {
      const item = {
        _id: DATACART._id,
        title: DATACART.title,
        imagen: DATACART.imagen,
        price_pesos: DATACART.price_pesos,
        total: 1
      };
      listCart.unshift(item);
    }
    this.cart.next(listCart);
  }

  resetCart() {
    let listCart: any = [];
    this.cart.next(listCart);
  }

  removeItemCart(DATACART: any) {
    let listCart = this.cart.getValue();
    let index = listCart.findIndex((item: any) => item._id == DATACART._id);
    if (index != -1) {
      listCart.splice(index, 1);
    }
    this.cart.next(listCart);
  }
}
