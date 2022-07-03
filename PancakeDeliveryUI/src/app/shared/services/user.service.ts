import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Login } from '../models/login.model';
import { Register } from '../models/register.model';
import { Token } from '../models/token.model';
import { Product } from '../models/product.model';

@Injectable({
    providedIn: 'root'
})

export class UserService {
    constructor (private http: HttpClient) {}

    login(login: Login): Observable<Token> 
    {
        return this.http.post<Token>(environment.serverURL + '/api/users/login', login);
    }

    register(register: Register)
    {
        return this.http.post<Object>(environment.serverURL + '/api/users/register', register);
    }

    upload(formData: FormData): Observable<HttpEvent<Object>>
    {
        return this.http.post<HttpEvent<Object>>(environment.serverURL + '/api/users/uploadImage', formData, {reportProgress: true, observe: 'events'})
    }

    getAllProducts(): Observable<Product[]>
    {
        return this.http.get<Product[]>(environment.serverURL + '/api/users/getAllProducts')
    }
}