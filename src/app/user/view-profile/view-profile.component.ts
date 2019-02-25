import { Component, OnInit } from '@angular/core';
import { UserService } from '../../common/user.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {
userDetail;
  constructor(private userService: UserService) { }

  ngOnInit() {

    if(this.userService && this.userService.ActiveUser){
      this.userDetail = this.userService.ActiveUser;
    }
  }

}
