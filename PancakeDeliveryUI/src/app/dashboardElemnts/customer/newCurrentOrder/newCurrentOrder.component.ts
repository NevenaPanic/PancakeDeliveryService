import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MakeOrder } from 'src/app/shared/models/makeOrder.model';
import { OrderProduct } from 'src/app/shared/models/orderProduct.model';
import { Product } from 'src/app/shared/models/product.model';
import { UserService } from 'src/app/shared/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-newCurrentOrder',
  templateUrl: './newCurrentOrder.component.html',
  styleUrls: ['./newCurrentOrder.component.css']
})
export class NewCurrentOrderComponent implements OnInit{

    allProducts: Product[] = [];
    total: number = 5;
    order: string = '';
    orderedProducts: OrderProduct[] = [];
    customerID: number = 0;

    // message control
    clicked: string = '';


    ngOnInit(): void {
        this.userService.getAllProducts().subscribe(
            (data: Product[]) =>
            {
                this.allProducts = data;
            }
        );

        let token = localStorage.getItem('token');
        if(token != null)
        {
            let decodedToken = JSON.parse(atob(token.split('.')[1]));
            this.customerID = decodedToken.id;
        }
    }
    
    // dodam konstruktor sa dep. in.
    constructor(private userService: UserService, private snackBar: MatSnackBar) {
    }   
    
    makeOrderForm = new FormGroup({
        deliveryAddress : new FormControl('', [Validators.max(100), Validators.required]),
        comment : new FormControl('', Validators.max(250))
    })

    addItemToOrder( orderItem : OrderProduct ){
        
        let alredyOrdered = this.orderedProducts.findIndex( product => product.productID == orderItem.productID);
        let addedProduct = this.allProducts.find(product => product.id == orderItem.productID);
        if(alredyOrdered != -1)
        {
            this.orderedProducts[alredyOrdered].quantity += orderItem.quantity;
            this.rewriteOrder();
        }
        else
        {
            this.orderedProducts.push(orderItem);
            if(addedProduct != undefined)
                this.order += addedProduct.name + ' x ' + orderItem.quantity + '\n';
        }
        
        if(addedProduct != undefined)
            this.total += addedProduct.price * orderItem.quantity;
        
        this.snackBar.open('Product added to order => id[ ' + orderItem.productID + '] , quantity [' + orderItem.quantity + ' ]','Close',
                          {duration: 1500, verticalPosition: 'top', horizontalPosition: 'center'});
    }

    rewriteOrder()
    {
        this.order = '';
        this.orderedProducts.forEach(item => {
            
            let addedProduct = this.allProducts.find(product => product.id == item.productID);

            if(addedProduct != undefined)
            {
                this.order += addedProduct.name + ' x ' + item.quantity + '\n';
            }
        });
    }

    makeOrder()
    {
        let message: string = '';

        if(this.clicked === 'clear')
        {
            this.clicked = '';
        }
        else
        {

            if((this.order === '' || this.orderedProducts.length == 0))
            {
                message = 'Please add products to order before clicking "Make Order" button.';
            }
            else
            {
                if(this.makeOrderForm.valid)
                {
                    let newOrder: MakeOrder = new MakeOrder();
                    newOrder.customerID = this.customerID;
                    newOrder.comment = this.makeOrderForm.controls['comment'].value;
                    newOrder.deliveryAddress = this.makeOrderForm.controls['deliveryAddress'].value;
                    newOrder.total = this.total;
                    newOrder.orderedProducts = this.orderedProducts;
                    
                    this.userService.makeOrder(newOrder).subscribe(
                        data =>
                        {
                            console.log(data);
                        }
                    );
                }
                else
                {
                    // invalid input
                    if(this.makeOrderForm.controls['deliveryAddress'].value  === '')
                        message = 'Please enter delivery address, can\'t make order without it!';
                    else
                        message = 'Address max 100 caracters and comment max 250 caracters.';
    
                }    
            }
            
            if(message != '')
            {
                this.snackBar.open(message, 'Close', {duration: 5000, horizontalPosition:'center', verticalPosition:'top'});
                message = '';
            }
        }
    }

    clearOrder() : void
    {
        this.clicked = 'clear';
        // empty order lists
        this.order = '';
        this.orderedProducts = [];
        this.total = 5;
    }
}