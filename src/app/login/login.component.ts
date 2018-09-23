import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user = {
    email: '',
    password: '',
    name: ''
  };


  constructor(private auth: AuthService,
     private router: Router,
     private userService: UserService,
     private alertService: AlertService) {
  }

  loginWithGoogle() {
    this.auth.loginWithGoogle();
  }

  login() {
    this.auth.login(this.user.email, this.user.password);
  }

}
