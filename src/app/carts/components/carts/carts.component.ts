import { Component, OnInit } from '@angular/core';
import { CartsService } from '../../services/carts.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductsService } from 'src/app/products/services/products/products.service';

@Component({
  selector: 'app-carts',
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.scss']
})
export class CartsComponent implements OnInit {
  success: boolean = false;
  carts: any[] = [];
  products: any[] = [];
  form!: FormGroup;
  details: any;
  total = 0;
  constructor(private service: CartsService, private build: FormBuilder, private product: ProductsService) { }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.form = this.build.group({
      start: [''],
      end: ['']
    })
    this.getAllCarts();
  }
  getAllCarts() {
    this.service.getAllCarts().subscribe((res: any) => {
      this.carts = res;
    })
  }
  applyFilter() {
    console.log(this.form.value);
    let date = this.form.value;
    this.service.getAllCarts(date).subscribe((res: any) => {
      this.carts = res;
    })
  }
  deleteCart(id: number) {
    this.service.deleteCart(id).subscribe(res => {
      this.getAllCarts()
      alert('cart deleted')
    })
  }

  view(index: number) {
    this.details = this.carts[index];
    for (let x in this.details.products) {
      this.product.getProductById(this.details.products[x].productId).subscribe(res => {
        this.products.push({ item: res, quantity: this.details.products[x].quantity });
      })
    }
    console.log(this.details)
  }
}
