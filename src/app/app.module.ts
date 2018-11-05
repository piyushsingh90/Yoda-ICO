import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { WalletComponent } from './wallet/wallet.component';
import { LoginComponent } from './login/login.component';
import { ManageComponent } from './admin/manage/manage.component';
import { AuthService } from './auth.service';
import { AuthGuardService } from './auth-guard.service';
import { UserService } from './user.service';
import { AdminAuthGuardService } from './admin-auth-guard.service';
import { ProfileComponent } from './profile/profile.component';
import { VerifyComponent } from './admin/verify/verify.component';
import { CountryService } from './country.service';
import { WhitelistComponent } from './whitelist/whitelist.component';
import { AlertComponent } from './alert/alert.component';
import { AlertService } from './alert.service';
import { SignupComponent } from './signup/signup.component';
import { IdentityService } from './identity.service';
import { UploadService } from './upload.service';
import { LeftMenuComponent } from './left-menu/left-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    WalletComponent,
    LoginComponent,
    ManageComponent,
    ProfileComponent,
    VerifyComponent,
    WhitelistComponent,
    AlertComponent,
    SignupComponent,
    LeftMenuComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
      {path: '', component: HomeComponent},
      {path: 'profile/:id', component: ProfileComponent, canActivate: [AuthGuardService]},
      {path: 'wallet/:id', component: WalletComponent, canActivate: [AuthGuardService]},
      {path: 'whitelist/:id', component: WhitelistComponent, canActivate: [AuthGuardService]},
      {path: 'login', component: LoginComponent},
      {path: 'signup', component: SignupComponent},
      {path: 'admin/verify/:id', component: VerifyComponent, canActivate: [AdminAuthGuardService]},
      {path: 'admin/manage', component: ManageComponent, canActivate: [AdminAuthGuardService]}
    ])
  ],
  providers: [
    AuthService,
    AuthGuardService,
    UserService,
    AdminAuthGuardService,
    CountryService,
    AlertService,
    IdentityService,
    UploadService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
