import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
    // dodam ovo
    userType: string = '';
    username: string = '';

    ngOnInit(): void {
        let token = localStorage.getItem('token');
        if(token != null)
        {
            let decodedToken = JSON.parse(atob(token.split('.')[1]));
            this.userType = decodedToken.type;
            this.username = decodedToken.username;
        }
    }

    // dodam konstruktor sa dep. in.
    constructor(private service: UserService, private snackBar: MatSnackBar, private router: Router) {
    }
}