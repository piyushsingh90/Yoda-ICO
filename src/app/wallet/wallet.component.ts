import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent {
  user = {};
  id;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private alertService: AlertService) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.userService.get(this.id).take(1).subscribe(u => this.user = u);
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
