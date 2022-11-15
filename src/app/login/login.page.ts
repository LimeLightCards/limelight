import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public isLogin = true;

  public username = '';
  public email = '';
  public password = '';

  public loginError = '';
  public registerError = '';

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {

  }

  async login() {
    if(!this.email || !this.password) {
      return;
    }

    try {
      await this.authService.signIn(this.email, this.password);
      this.router.navigate(['/profile']);
    } catch(e) {
      this.loginError = e.message;
    }
  }

  async register() {
    if(!this.email || !this.password || !this.username) {
      return;
    }

    try {
      await this.authService.signUp(this.email, this.password, this.username);
      this.router.navigate(['/profile']);
    } catch(e) {
      this.registerError = e.message;
    }
  }

}
