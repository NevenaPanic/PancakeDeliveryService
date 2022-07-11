import { OrderProduct } from "./orderProduct.model";

export class MakeOrder
{
    customerID: number = 0;
    total: number = 0;
    comment: string = '';
    deliveryAddress: string = '';
    orderedProducts: OrderProduct[] = [];
}