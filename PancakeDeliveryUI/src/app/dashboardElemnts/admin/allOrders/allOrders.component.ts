import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/shared/models/order.model';
import { AdminService } from 'src/app/shared/services/admin.service';

@Component({
  selector: 'app-allOrders',
  templateUrl: './allOrders.component.html',
  styleUrls: ['./allOrders.component.css']
})
export class AllOrdersComponent implements OnInit{

    allOrders: Order[] = [];

    ngOnInit(): void {
        this.adminService.getAllOrders().subscribe(
            (data : Order[]) =>
            {
                this.allOrders = data;
            }
        )
     }

    // dodam konstruktor sa dep. in.
    constructor(private adminService: AdminService) { }
}