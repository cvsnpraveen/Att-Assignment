import { Component, OnInit } from '@angular/core';
import { UserService } from '../../common/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  phoneRegex = /^([6-9]{1})([0-9]{9})$/;

  showSuccessMessage : Boolean;
  serverErrorMessage: String;
  
  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm){
    this.userService.postUser(form.value).subscribe(
      res => {
        this.showSuccessMessage = true;
        setTimeout(() => this.showSuccessMessage = false, 4000);
        this.resetForm(form);
      },
      err => {
        if (err.status === 422) {
          this.serverErrorMessage = err.error.join('<br/>');
        }
        else
          this.serverErrorMessage = 'Something went wrong.Please contact admin.';
      }
    );
  }
  resetForm(form: NgForm) {
    this.userService.selectedUser = {
      name: '',
      type: '',
      phone: '',
      status: 'Active',
      email: '',
      password: '',
      role:''
    };
    form.resetForm();
    this.serverErrorMessage = '';
  }
}