import { Component, OnInit, Input } from '@angular/core';
import {Router} from '@angular/router';
import { UserService } from '../../common/user.service';
import { User } from 'src/app/common/user.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  userDetails;
  isAdmin;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.getUserDashboard().subscribe(
      res=>{
        this.userDetails = res['user'];
        this.isAdmin = (this.userDetails.role.toLowerCase() === 'admin')? true:false;
        console.log("User=>", res)
        this.setUserAction(this.userDetails);
        this.userService.ActiveUser = res['user'];
      },
      err =>{}
    );
  }

  setUserAction(user: User) {
    if (user && user.role) {
      if (user.role.toLowerCase() === "admin") {
        this.router.navigateByUrl('/userDashboard/create')
      }
      else if (user.role.toLowerCase() === "organization") {
        this.router.navigateByUrl('/userDashboard/view')
      }
    }
  }
  onLogout(){
    this.userService.deleteToken();
    setTimeout(() => console.log("loggedout successfully"), 4000);

    this.router.navigate(['/login']);
  }


}
