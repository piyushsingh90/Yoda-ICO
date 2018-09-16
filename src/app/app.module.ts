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

@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    WalletComponent,
    LoginComponent,
    ManageComponent,
    ProfileComponent,
    VerifyComponent
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
      {path: 'profile', component: ProfileComponent},
      {path: 'wallet', component: WalletComponent, canActivate: [AuthGuardService]},
      {path: 'login', component: LoginComponent},
      {path: 'admin/verify/:id', component: VerifyComponent, canActivate: [AdminAuthGuardService]},
      {path: 'admin/manage', component: ManageComponent, canActivate: [AdminAuthGuardService]}
    ])
  ],
  providers: [
    AuthService,
    AuthGuardService,
    UserService,
    AdminAuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
