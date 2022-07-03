import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  // dodam ovo
  ngOnInit(): void {
  }

  // dodam konstruktor sa dep. in.
  constructor(private userService: UserService, private snackBar: MatSnackBar) {
  }
}