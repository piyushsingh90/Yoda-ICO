import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { AppUser } from '../models/app-user';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import { AngularFireAuth } from 'angularfire2/auth';
import { Subscription } from 'rxjs/Subscription';
import { CountryService } from '../country.service';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user = {};
  id;
  countries$;
  currentUser = {};
  today = new Date();
  minDate = {year: 1900, month: 1, day: 1};
  maxDate = {year: this.today.getUTCFullYear() - 18, month: this.today.getUTCMonth() + 1, day: this.today.getUTCDate()};

  constructor(private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private countryService: CountryService,
    private authService: AuthService,
    private alertService: AlertService) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.userService.get(this.id).take(1).subscribe(u => this.user = u);
    this.countries$ = this.countryService.getCountries();
    this.currentUser = this.authService.getCurrentUser();
  }

  update(user) {
    if (this.id) {
      this.userService.update(this.id, user);
      this.alertService.success('Updated');
    } else {
      this.userService.save(user);
    }
  }

}
