import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrderProduct } from 'src/app/shared/models/orderProduct.model';
import { Product } from 'src/app/shared/models/product.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-productDisplay',
  templateUrl: './productDisplay.component.html',
  styleUrls: ['./productDisplay.component.css']
})
export class ProductDisplayComponent implements OnInit{

  @Input() product: Product = new Product();
  @Output() public addedProduct : EventEmitter<OrderProduct> = new EventEmitter<OrderProduct>();
  
  ngOnInit(): void {}

  // dodam konstruktor sa dep. in.
  constructor(private snackBar: MatSnackBar) { }

  // form added in ts
  addToOrderForm = new FormGroup({
    quantity : new FormControl('',  [Validators.required, Validators.min(1)])
  })

  addToOrder()
  {
    if(this.addToOrderForm.valid)
    {
      let orderedProduct : OrderProduct = new OrderProduct();
      orderedProduct.productID = this.product.id;
      orderedProduct.quantity = this.addToOrderForm.controls['quantity'].value;
      this.addedProduct.emit(orderedProduct);
    }
    else
    {
      this.snackBar.open('Amount must be entered and must be greater than 0!', 'Close', 
                          {duration: 3500, horizontalPosition:'center', verticalPosition:'top'});
    }

  }

  public createImgPath = (serverPath: string) => { 
      return environment.serverURL + '/' + serverPath; 
  }
}