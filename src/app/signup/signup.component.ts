import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  email = '';
  password = '';

  constructor(private auth: AuthService,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService) { }

  ngOnInit() {
  }

  register(newUser) {
    this.auth.emailSignUp(this.email, this.password);
  }

}
