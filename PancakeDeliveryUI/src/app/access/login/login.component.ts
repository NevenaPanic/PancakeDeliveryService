import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Login } from '../../shared/models/login.model';
import { UserService } from '../../shared/services/user.service';
import { Router } from '@angular/router';
import { Token } from 'src/app/shared/models/token.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
    // dodam ovo
    ngOnInit(): void {
    }

    // dodam konstruktor sa dep. in.
    constructor(private service: UserService, private snackBar: MatSnackBar, private router: Router) {
    }

    // form added in ts
    loginForm = new FormGroup({
        email : new FormControl('', [Validators.email, Validators.required]),
        password : new FormControl('', Validators.required)
    })

    // dodamo funkciju koju poziva forma
    login() {
        if(this.loginForm.valid)
        {
            console.log('Valid Info');

            let login: Login = new Login();
            login.email = this.loginForm.controls['email'].value;
            login.password = this.loginForm.controls['password'].value;

            this.service.login(login).subscribe(
                (data : Token) => 
                {  
                    console.log(data);
                    let message: string = '';
                    if (data.token == '-2')
                    {
                        this.snackBar.open('[ERROR]: Wrong password! Please try again.', 'Close', { duration:6000, horizontalPosition:'center', verticalPosition:'top'});
                    }
                    else if (data.token === '-1')
                    {
                        this.snackBar.open('[ERROR]: Wrong email or not registered user! Please try again or register.', 'Close', { duration:6000, horizontalPosition:'center', verticalPosition:'top'});
                    }
                    else
                    {
                        this.snackBar.open('Successfully loged in! :)', 'Close', { duration:6000, horizontalPosition:'center', verticalPosition:'top'});
                        // otkomentarisi me kad napravis dashboard
                        localStorage.setItem('token', data.token);
                        this.router.navigateByUrl('/dashboard');
                    }        
                },
                error =>
                {
                    console.log('Error')
                }
            );
            
        }
        else
        {
            this.snackBar.open('Please fill in form correctly! :)', 'Close', { duration:6000, horizontalPosition:'center', verticalPosition:'top'});
        }
    }
}