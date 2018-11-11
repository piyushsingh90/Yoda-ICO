import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../user.service';
import 'rxjs/add/operator/take';
import { AlertService } from '../../alert.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent {
  user = {};
  id;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private alertService: AlertService) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.userService.get(this.id).take(1).subscribe(u => this.user = u);
  }

  save(user) {
    if (this.id) {
      this.userService.update(this.id, user);
      let message;
      if (user.isVerified) {
        message = user.userName + ' has been verified';
      } else {
        message = user.userName + ' has been un-verified';
      }
      this.alertService.success(message, true);
      this.router.navigate(['/admin/manage']);
    } else {
      this.userService.save(user);
    }
  }

}
