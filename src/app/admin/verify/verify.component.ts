import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../user.service';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {
  user = {};
  id;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private userService: UserService) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.userService.get(this.id).take(1).subscribe(u => this.user = u);
  }

  ngOnInit() {
  }

  save(user) {
    if (this.id) {
      this.userService.update(this.id, user);
      this.router.navigate(['/admin/manage']);
    } else {
      this.userService.save(user);
    }
  }

}
