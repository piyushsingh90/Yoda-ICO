import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  users$;

  constructor(private userService: UserService) {
    this.users$ = this.userService.getAll();
  }

  ngOnInit() {
  }

}
