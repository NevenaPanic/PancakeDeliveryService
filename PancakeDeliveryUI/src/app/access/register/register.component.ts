import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Register } from 'src/app/shared/models/register.model';
import { UserService } from '../../shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  // used for image upload
  response: {dbPath: ''} = {dbPath: ''};
  // dodam ovo
  ngOnInit(): void {
  }

  // dodam konstruktor sa dep. in.
  constructor(private userService: UserService, private snackBar: MatSnackBar, private router: Router) {
  }

  // form added in ts
  registerForm = new FormGroup({
      username : new FormControl('', Validators.required),
      email : new FormControl('', [Validators.email, Validators.required]),
      password : new FormControl('', Validators.required),
      repeatPassword : new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      dateOfBirth: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      userType: new FormControl('', Validators.required)
  })

  uploadFinished = (event : any) => { 
    this.response = event; 
  }

  // dodamo funkciju koju poziva forma
  register()
  {
    //this.snackBar.open('Testing', 'Close', { duration: 2000, horizontalPosition: 'center', verticalPosition: 'top' });
    let errorMessage: string = '';
    let register: Register = new Register();
    register.username = this.registerForm.controls['username'].value;
    register.email = this.registerForm.controls['email'].value;
    register.password = this.registerForm.controls['password'].value;
    register.name = this.registerForm.controls['name'].value;
    register.lastname = this.registerForm.controls['surname'].value;
    register.address = this.registerForm.controls['address'].value;
    register.dateOfBirth = this.registerForm.controls['dateOfBirth'].value;
    register.userType = this.registerForm.controls['userType'].value;

    console.log(register);

    if(this.registerForm.valid)
    {
      console.log('Valid input');
      if(this.registerForm.controls['password'].value != this.registerForm.controls['repeatPassword'].value)
      {
        errorMessage += 'Passwords do not match! \n';
      }

      if(register.dateOfBirth == undefined)
      {
        errorMessage += 'Date is undefined! \n';
      }

      if(new Date(register.dateOfBirth) > new Date)
      {
        errorMessage += 'Date of brth must be in the past! \n';
      }

      if(this.response.dbPath != '')
      {
        register.userPicture = this.response.dbPath;
      }
        
    }
    else
    {
      errorMessage = 'Form input is not valid, please enter all correct data and try again.';
    }

    if(errorMessage != '')
    {
      this.snackBar.open(errorMessage, 'Close', { duration: 4000, horizontalPosition: 'center', verticalPosition: 'top' });
    }
    else
    {
      this.userService.register(register).subscribe(
        data =>
        {
          let error : string = '';
          if(data == 0)
          {
            this.snackBar.open('Success :)', 'Close', { duration: 4000, horizontalPosition: 'center', verticalPosition: 'top' });
            this.router.navigateByUrl('/home');
          }
          else if(data === -1)
          {
            error += 'Email is already registered, try logging in or another email.';
            this.snackBar.open(error, 'Close', {duration: 6000, horizontalPosition: 'center', verticalPosition: 'top'});
          }
          else
          {
            error += 'Error occured!'
            this.snackBar.open(error, 'Close', {duration: 6000, horizontalPosition: 'center', verticalPosition: 'top'});
          }  
        }
      );
    }
  }
}