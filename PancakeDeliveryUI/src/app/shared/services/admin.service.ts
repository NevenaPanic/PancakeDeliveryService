import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Product } from "../models/product.model";
import { User } from "../models/user.model";

@Injectable({
    providedIn: 'root'
})

export class AdminService {
    constructor (private http: HttpClient) {}

    addProduct(product: Product)
    {
        return this.http.post<Object>(environment.serverURL + '/api/admins/addProduct', product);
    }

    getAllUsers() : Observable<User[]>
    {
        return this.http.get<User[]>(environment.serverURL + '/api/admins/getAllUsers');
    }

    verifyUser(id: number) : Observable<Object>
    {
        return this.http.post<Object>(environment.serverURL + '/api/admins/verifyUser', id);
    }

    rejectUser(id: number) : Observable<Object>
    {
        return this.http.post<Object>(environment.serverURL + '/api/admins/rejectUser', id);
    }
}