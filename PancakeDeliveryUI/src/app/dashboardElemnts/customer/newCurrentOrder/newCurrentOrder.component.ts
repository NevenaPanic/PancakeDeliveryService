import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    ngOnInit(): void {}

    // dodam konstruktor sa dep. in.
    constructor(private userService: UserService, private snackBar: MatSnackBar) {
        userService.getAllProducts().subscribe(
            (data: Product[]) =>
            {
                this.allProducts = data;
                console.log(this.allProducts);
            }
        );
    }

    public createImgPath = (serverPath: string) => { 
        return environment.serverURL + '/' + serverPath; 
    }
}