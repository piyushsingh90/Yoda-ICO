import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

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

  email = '';
  password = '';

  constructor(private auth: AuthService, private router: Router, private userService: UserService) {
  }

  loginWithGoogle() {
    this.auth.loginWithGoogle();
  }

  login() {
    this.auth.login(this.user.email, this.user.password);
  }

  register(newUser) {
    // this.auth.emailSignUp(newUser.email, newUser.password);
    this.auth.emailSignUp(this.email, this.password);
  }

}
