import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent {
  users$;
  displayedColumns: string[] = ['userName', 'email', 'isVerified', 'verify'];
  dataSource;

  constructor(private userService: UserService) {
    this.users$ = this.userService.getAll();
    this.dataSource = this.userService.getAll();
  }
}
