import { Component, OnInit, Input } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent implements OnInit {

  searchMode: boolean;
  search: string;
  singleUser = false;
  constructor(private serv: UsersService, private route: ActivatedRoute) { }


  ngOnInit() {
    this.searchMode = false;
    this.singleUser = this.serv.getUserMode();
  }


  onSearch() {
    this.serv.searchUsers(this.search.toLowerCase());
    if (this.search.trim().length > 0) {
      this.searchMode = true;
    } else {
      this.searchMode = false;
      // this.search
    }
  }
  clearSearch() {
    this.search = '';
    this.serv.searchUsers('');
  }

}
