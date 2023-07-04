import { Component, OnInit, Output } from '@angular/core';
import { ProductsService } from '../../services/products/products.service';
import { Product } from '../../models/product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  base64: any = '';
  form!: FormGroup;
  constructor(private service: ProductsService, private formBuilder: FormBuilder) { }
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required]],
      price: ['', [Validators.required]],
      description: ['', [Validators.required]],
      image: ['', [Validators.required]],
      category: ['', [Validators.required]]
    })
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


  getSelectedCategory(event: any) {
    this.form.get('category')?.setValue(event.target.value);
    console.log(this.form)
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
  getImagePath(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.base64 = reader.result;
      this.form.get('image')?.setValue(this.base64);
      console.log(this.base64);

    }
  }
  addProduct() {
    const model = this.form.value;
    this.service.createProduct(model).subscribe(res => {
      console.log('add product done')
    });
    console.log(this.form)
  }
  update(item: any) {
    this.form.get('title')?.setValue(item.title);
    this.form.get('description')?.setValue(item.description);
    this.form.get('category')?.setValue(item.category);
    this.form.get('price')?.setValue(item.price);
    this.form.get('image')?.setValue(item.image);
    this.form.patchValue({
      title: item.title,
      price: item.price,
      description: item.description,
      image: item.image,
      category: item.category
    })
    this.base64 = item.image;
  }
}
