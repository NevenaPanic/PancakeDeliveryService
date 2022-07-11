export class Order
{
    orderID : number = 0;
    total : number = 0;
    comment : string = '';
    deliveryAddress : string = '';
    status : string = '';       // PENDING, IN_DELIVERY, DELIVERED
    time : Date = new Date();

    delivererID : number = 0;
    delivererFullName: string = '';
    delivererUsername: string = '';

    customerID: number = 0;
    customerFullName: string = '';
    customerUsername: string = ''; 

    orderItems : string = '';
}