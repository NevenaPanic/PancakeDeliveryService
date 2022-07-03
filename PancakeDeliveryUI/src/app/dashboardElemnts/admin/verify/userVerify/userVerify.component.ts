import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/shared/models/user.model';
import { AdminService } from 'src/app/shared/services/admin.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-userVerify',
  templateUrl: './userVerify.component.html',
  styleUrls: ['./userVerify.component.css']
})
export class UserVerifyComponent implements OnInit{

    @Input() user: User = new User();
    

    ngOnInit(): void {}

    // dodam konstruktor sa dep. in.
    constructor(private adminService: AdminService, private snackBar: MatSnackBar) {
    }

    public createImgPath = (serverPath: string) => { 
        return environment.serverURL + '/' + serverPath; 
    }

    verify(){
        if(this.user.verified === false)
        {
            this.adminService.verifyUser(this.user.id).subscribe(
                data =>
                {
                    if(data === true)
                    {
                        this.snackBar.open('Deliverer successfully verified!', 'Close', {duration: 5000, horizontalPosition: 'center', verticalPosition: 'top'});
                        this.user.verified = true;
                    }
                    else
                    {
                        this.snackBar.open('Failed to verify deliverer!', 'Close', {duration: 5000, horizontalPosition: 'center', verticalPosition: 'top'});
                    }
                }
            );
        }
    }

    reject(){
        this.adminService.rejectUser(this.user.id).subscribe(
            data =>
            {
                if(data === true)
                {
                    this.snackBar.open('Deliverer successfully rejected!', 'Close', {duration: 5000, horizontalPosition: 'center', verticalPosition: 'top'});
                    this.user.verified = false;
                }
                else
                {
                    this.snackBar.open('Failed to reject deliverer!', 'Close', {duration: 5000, horizontalPosition: 'center', verticalPosition: 'top'});
                }
            }
        );
    }
}