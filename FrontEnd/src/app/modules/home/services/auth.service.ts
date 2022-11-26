import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../../models/user.model';
import { Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient,private router : Router) {}

  login(email: string, password: string) {
    return this.http.post<any>(environment.backEndUrl + 'auth/login', {
      email: email,
      password: password,
    });
  }

  logout() {

    localStorage.removeItem("user")
    this.router.navigate(['/sign-in'])

    }

  signUp(user: User) {
    return this.http.post<any>(environment.backEndUrl + 'auth/signup', {
      user,
    });
  }

  loggedIn() {
    return !!localStorage.getItem('user');
  }

  getToken() {
    return localStorage.getItem('user');
  }

  getId(){
    const userItem = this.getToken()

    if(userItem !== null){
      const userParsed = JSON.parse(userItem)
      return userParsed.userId
    }else{
      this.logout()
      return 0;
    }
  }

  getRole(){
    const userItem = this.getToken()
    if(userItem !== null){
      const userParsed = JSON.parse(userItem)
      return userParsed.role
    }else{
      this.logout()
      return 0;
    }
  }

  setUpToken(user : any){
    const storageObj = {
      token : user.token,
      userId : user.userId,
      role : user.role
  }
  localStorage.setItem('user', JSON.stringify(storageObj));
  }
}
