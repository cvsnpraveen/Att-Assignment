import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser: User = {
    name: '',
    type:'',
    phone: '',
    status: 'Active',
    email: '',
    password: '',
    role: ''
  };
  ActiveUser:User;

  noAuthHeader = { headers: new HttpHeaders({'NoAuth': 'True'})};
  constructor(private http: HttpClient) { }

  //HTTP methods
  postUser(user: User) {
    return this.http.post(environment.apiBaseUrl + '/create', user)
  }
  login(authCredentials) {
    return this.http.post(environment.apiBaseUrl + '/authenticate', authCredentials, this.noAuthHeader)
  }
  deleteUser(user:User) {
    console.log("111111111111111");
    return this.http.post(environment.apiBaseUrl + '/deleteUser', user)
  }

  getUserDashboard() {
    return this.http.get(environment.apiBaseUrl + '/userDashboard');
  }
  getAllUsers() {
    return this.http.get(environment.apiBaseUrl + '/viewAll');
  }

  //Other methods
  setToken(token: string) {
    localStorage.setItem('token', token)
  }
  getToken() {
    return localStorage.getItem('token')
  }
  deleteToken() {
    localStorage.removeItem('token');
  }
  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else {
      return null;
    }
  }
  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload)
    return userPayload.exp > Date.now() / 1000;
  }
}
