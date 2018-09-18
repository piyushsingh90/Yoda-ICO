import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user = {
    email: '',
    password: ''
  };
  constructor(private auth: AuthService, private router: Router) { }

  loginWithGoogle() {
    this.auth.loginWithGoogle();
  }

  login() {
    this.auth.login(this.user.email, this.user.password)
       .then((res) => {
          console.log(res);
          this.router.navigate(['home']);
       })
       .catch((err) => console.log('error: ' + err));
  }

}
