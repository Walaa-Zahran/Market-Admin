import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartsComponent } from './components/carts/carts.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [CartsComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule
  ],
  providers: []

})
export class CartsModule { }
