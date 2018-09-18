import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-whitelist',
  templateUrl: './whitelist.component.html',
  styleUrls: ['./whitelist.component.css']
})
export class WhitelistComponent {
  user = {};
  id;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private userService: UserService) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.userService.get(this.id).take(1).subscribe(u => this.user = u);
  }

  update(user) {
    if (this.id) {
      this.userService.update(this.id, user);
    } else {
      this.userService.save(user);
    }
  }


}
