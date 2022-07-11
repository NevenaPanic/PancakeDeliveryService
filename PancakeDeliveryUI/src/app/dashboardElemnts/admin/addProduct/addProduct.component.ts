import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/shared/models/product.model';
import { AdminService } from 'src/app/shared/services/admin.service';

@Component({
  selector: 'app-addProduct',
  templateUrl: './addProduct.component.html',
  styleUrls: ['./addProduct.component.css']
})
export class AddProductdComponent implements OnInit{
    // used for image upload
    response: {dbPath: ''} = {dbPath: ''};

    ngOnInit(): void { }

    // dodam konstruktor sa dep. in.
    constructor(private adminService: AdminService, private snackBar: MatSnackBar, private router: Router) { }

    // form added in ts
    addForm = new FormGroup({
        name : new FormControl('', Validators.required),
        price : new FormControl('', Validators.required),
        ingredients : new FormControl('', Validators.required),
    })

    uploadFinished = (event : any) => { 
        this.response = event; 
    }

    addProduct()
    {
        let errorMessage: string = '';

        if(this.addForm.valid)
        {
            let product: Product = new Product();
            product.name = this.addForm.controls['name'].value;
            product.ingredients = this.addForm.controls['ingredients'].value;
            product.price = this.addForm.controls['price'].value;
            product.pictureSource = this.response.dbPath;

            if(product.price < 0)
            {
                this.snackBar.open('Price must be positive number.' , 'Close', {duration:5000});
                return;
            }

            if(product.pictureSource === '')
            {
                this.snackBar.open('Please upload picture of product.' , 'Close', {duration:5000});
                return;
            }
            
            this.adminService.addProduct(product).subscribe(
                (data) =>
                {
                    if(data === true)
                    {
                        this.snackBar.open('Product added successfully!' , 'Close', {duration:5000});
                        this.router.navigateByUrl('/dashboard');
                    }
                    else
                    {
                        this.snackBar.open('Product with that name already exists.' , 'Close', {duration:5000});
                        return;
                    }

                },
                error =>
                {
                    console.log(error);
                }
            );
        }
        else
        {
            this.snackBar.open('Form is invalid, correctly input information.' , 'Close', {duration:5000});
        }
    }
}