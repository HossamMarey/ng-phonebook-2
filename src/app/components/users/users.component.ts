import { Component, OnInit, ViewEncapsulation, DoCheck } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UsersComponent implements OnInit, DoCheck {
  users: User[];
  noDataMode = false;
  constructor(private serv: UsersService) { }

  ngOnInit() {
    this.serv.setUserMode(false);
    this.users = this.serv.getUsers();
  }

  ngDoCheck() {
    this.users = this.serv.getUsers();

    if (this.users.length <= 0) {
      this.noDataMode = true;
    } else {
      this.noDataMode = false;

    }
  }
}
