import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { AcceptOrder } from "../models/acceptOrder.model";
import { Order } from "../models/order.model";


@Injectable({
    providedIn: 'root'
})


export class DelivererService {
    constructor (private http: HttpClient) {}

    getPendingOrders(): Observable<Order[]>
    {
        return this.http.get<Order[]>(environment.serverURL + '/api/deliverers/getPendingOrders')
    }

    acceptOrder(acceptInfo : AcceptOrder) : Observable<Order>
    {
        return this.http.post<Order>(environment.serverURL + '/api/deliverers/acceptOrder', acceptInfo);
    }

}
