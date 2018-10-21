import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { ActivatedRoute, Router } from '@angular/router';
import { AppUser } from './models/app-user';
import { UserService } from './user.service';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import { AlertService } from './alert.service';

@Injectable()
export class AuthService {
  user$: Observable<firebase.User>;
  appUser= {};

  authState: any = null;

  constructor(
    private userService: UserService,
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService) {
    this.user$ = afAuth.authState;

    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth;
    });
   }

  loginWithGoogle() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  login(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;
        this.router.navigate(['/profile/' + user.uid]);
      })
      .catch(error => {
        this.alertService.error(error.message, false);
      });
  }

  logout() {
    this.afAuth.auth.signOut();
    this.router.navigate(['/']);
  }

  get appUser$(): Observable<AppUser> {
    return this.user$
      .switchMap(user => {
        if (user) {
          return this.userService.get(user.uid);
        }
        return Observable.of(null);

      });
  }

  emailSignUp(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;
        const currentUser = firebase.auth().currentUser;
        const that = this;
        currentUser.sendEmailVerification().then(function() {
          that.router.navigate(['/profile/' + user.uid]);
          that.alertService.success('You have signed-up successfully. Please Update your profile', true);
        }).catch(function(error) {
          console.log('Error while sending Email', error);
        });
        })
      .catch(error => {
        this.alertService.error(error.message);
      });
  }

  getCurrentUser() {
    return firebase.auth().currentUser;
  }

}
