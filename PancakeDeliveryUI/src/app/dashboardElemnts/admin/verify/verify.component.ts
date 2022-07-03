import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from '../../../shared/services/admin.service';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit{

    allUsers: User[] = [];

    ngOnInit(): void {}

    // dodam konstruktor sa dep. in.
    constructor(private adminService: AdminService, private snackBar: MatSnackBar, private router: Router) {
        this.adminService.getAllUsers().subscribe(
            (users : User[]) =>
            {
                this.allUsers = users;
                console.log(this.allUsers);
            }
        );
    }
}