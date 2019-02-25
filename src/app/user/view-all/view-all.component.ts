import { Component, OnInit } from '@angular/core';
import {UserService} from '../../common/user.service';
@Component({
  selector: 'app-view-all',
  templateUrl: './view-all.component.html',
  styleUrls: ['./view-all.component.css']
})
export class ViewAllComponent implements OnInit {
users;
showSuccessMessage;
  constructor(private userService:UserService) { }

  ngOnInit() {
    this.userService.getAllUsers().subscribe(
      res=>{
        // this.userDetails = res['user'];
        // this.isAdmin = (this.userDetails.role.toLowerCase() === 'admin')? true:false;
        console.log("User=>", res);
        this.users = res['user'];
        // this.setUserAction(this.userDetails);
        // this.userService.ActiveUser = res['user'];
      },
      err =>{}
    );
  }
    deleteUser(user) {
    this.userService.deleteUser(user).subscribe(
      res => {
        this.showSuccessMessage = true;
        setTimeout(() => this.showSuccessMessage = false, 4000);
      },
      err => {
        if (err.status === 422) {
          // this.serverErrorMessage = err.error.join('<br/>');
        }
        else{}
          //this.serverErrorMessage = 'Something went wrong.Please contact admin.';
      }
    );

  }      

}
