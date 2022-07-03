import { HttpClient, HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserService } from '../shared/services/user.service';
@Component({
  selector: 'app-uploadPicture',
  templateUrl: './uploadPicture.component.html', 
  styleUrls: ['./uploadPicture.component.css']
})

export class UploadPictureComponent implements OnInit {

  progress: number = 0;
  message: string = "";

  @Output() public onUploadFinished = new EventEmitter();
  
  constructor(private http: HttpClient, private _userService: UserService) { }
  ngOnInit() {
  }

  uploadFile = (files : any) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    
    this._userService.upload(formData).subscribe({
        next: (event) => {
        if (event.type === HttpEventType.UploadProgress && event.total != undefined)
          this.progress = Math.round(100 * event.loaded / event.total);
        else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.onUploadFinished.emit(event.body);
        }
      },
      error: (err: HttpErrorResponse) => console.log(err)
    });
  }
}