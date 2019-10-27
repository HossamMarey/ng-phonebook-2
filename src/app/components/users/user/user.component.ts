import { Component, OnInit, Input, Output, EventEmitter, DoCheck } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../interfaces/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, DoCheck {

  singleUser = true;
  user: User = { name: '', id: 5, phone: '', img: 1 };
  editMode = false;
  imgEditMode = false;
  addUserMode = false;
  firstCheck = true;
  imgs = [1, 2, 3, 4, 5, 6];
  msg: string;
  constructor(private serv: UsersService, private route: ActivatedRoute, private router: Router) { }

  ngDoCheck() {

    // add user mode
    if (this.route.snapshot.params['id'] === 'add' && this.firstCheck) {
      this.firstCheck = false;
      this.user = { name: '', id: 0, phone: '', img: 1 };
      this.editMode = true;
      this.imgEditMode = true;
      this.addUserMode = true;
    }
  }

  ngOnInit() {
    this.serv.setUserMode(true);

    if (this.route.snapshot.params['id'] !== 'add') {
      this.user = this.serv.getUserById(+this.route.snapshot.params['id'])[0];
    }


  }

  onEdit() {
    this.editMode = true;
  }
  saveUser() {
    // this.user.phone = this.user.phone.trim();
    if (!+this.user.phone) {
      this.msg = 'Please Enter a Valid Phone Number';
    } else {
      if (!this.user.name.trim() || this.user.name.length < 4) {
        this.msg = ' The Name must be longer than 3 characters';
      } else if (!this.user.phone.trim()) {
        this.msg += ' Please Enter valid Number,';
      } else {
        // uniqn number
        if (this.serv.isPhoneNumber(this.user.phone.trim())) {
          this.msg = 'This phone number already exists';
          return;
        }

        this.editMode = false;
        this.msg = '';
        // add user
        if (this.addUserMode) {
          let lastId = 0;
          this.serv.getUsers().forEach(el => {
            if (el.id > lastId) {
              lastId = el.id;
            }
          });
          this.user.id = lastId + 1;

          this.serv.addUser(this.user);
          this.firstCheck = true;
          this.router.navigate(['/users', this.user.id]);

        } else {
          this.serv.updateUser(this.user);
        }
      }
    }



  }

  deleteUser() {
    this.serv.deleteUser(this.user);
    this.router.navigate(['/users']);

  }

  editImg() {
    if (this.editMode) {
      this.imgEditMode = true;
    }

  }
  saveImg(img) {
    if (this.editMode) {
      this.user.img = img;
      this.imgEditMode = false;
    }
  }

}
