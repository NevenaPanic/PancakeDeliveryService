import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AcceptOrder } from 'src/app/shared/models/acceptOrder.model';
import { Order } from 'src/app/shared/models/order.model';
import { DelivererService } from 'src/app/shared/services/deliverer.service';

@Component({
  selector: 'app-newOrders',
  templateUrl: './newOrders.component.html',
  styleUrls: ['./newOrders.component.css']
})
export class NewOrdersComponent implements OnInit{

    orders: Order[] = [];
    delivererID: number = 0;

    ngOnInit(): void {
        this.delivererService.getPendingOrders().subscribe(
            (data : Order[]) =>
            {
                this.orders = data;
                console.log(this.orders);
            }
        );

        let token = localStorage.getItem('token');
        if(token != null)
        {
            let decodedToken = JSON.parse(atob(token.split('.')[1]));
            this.delivererID = decodedToken.id;
        }
    }
    
    // dodam konstruktor sa dep. in.
    constructor(private delivererService: DelivererService, private router: Router) {
    }

    acceptOrder( orderID : number)
    {
        let acception: AcceptOrder = new AcceptOrder();
        acception.delivererID = this.delivererID;
        acception.orderID = orderID;

        this.delivererService.acceptOrder(acception).subscribe(
            (data: Order) =>
            {
                console.log(data);
            }
        );
    }
}