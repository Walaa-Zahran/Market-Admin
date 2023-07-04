import { Component, OnInit, Output } from '@angular/core';
import { ProductsService } from '../../services/products/products.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit {

  products: Product[] = [];
  categories: any[] = [];
  loading: boolean = false;
  cartProducts: any[] = [];
  constructor(private service: ProductsService) { }
  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }
  getProducts() {
    //we use subscribe as a pipe to  connect data from backend to frontend
    this.loading = true;
    this.service.getAllProducts().subscribe((res: any) => {
      this.products = res;
      this.loading = false;
      console.log('products', this.products);
    })


  }
  getCategories() {
    //we use subscribe as a pipe to  connect data from backend to frontend
    this.loading = true;
    this.service.getAllCategories().subscribe((res: any) => {
      this.categories = res;
      this.loading = false;

      console.log('categories', res);
    })


  }


  filterCategory(event: any) {
    let value = event.target.value;

    if (value == 'All') {
      this.getProducts();
    }
    else {
      this.getProductsCategory(value);
    }
    console.log(value);
  }
  getProductsCategory(keyword: string) {
    this.loading = true;
    this.service.getProductsByCategory(keyword).subscribe((res: any) => {
      this.loading = false;
      this.products = res;
    })
  }
  addToCart(event: any) {
    if ("cart" in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem('cart')!);
      let exist = this.cartProducts.find(item => item.item.id == event.item.id);
      if (exist) {
        alert('Product is already in your cart!');
      }
      else {
        this.cartProducts.push(event);
        localStorage.setItem('cart', JSON.stringify(this.cartProducts));
      }

    }
    else {
      this.cartProducts.push(event);
      localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    }
  }
}
