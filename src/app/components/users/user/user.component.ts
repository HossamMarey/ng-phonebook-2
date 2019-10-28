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
  // user: User = { name: '', uid: 1, phone: '', img: 1 };
  user = { name: '', phone: '', img: 1 };
  editMode = false;
  imgEditMode = false;
  addUserMode = false;
  firstCheck = true;
  imgs = [1, 2, 3, 4, 5, 6];
  msg: string;
  constructor(private serv: UsersService, private route: ActivatedRoute, private router: Router) { }

  ngDoCheck() {
    // add user mode
    if (this.route.snapshot.params['uid'] === 'add' && this.firstCheck) {
      this.firstCheck = false;
      this.user = { name: '', phone: '', img: 1 };
      this.editMode = true;
      this.imgEditMode = true;
      this.addUserMode = true;
    } else if (this.firstCheck) {
      this.user = this.serv.getUserById(+this.route.snapshot.params['uid'])[0];
    }
  }

  ngOnInit() {
    this.serv.setUserMode(true);
    if (this.route.snapshot.params['uid'] !== 'add') {
      this.user = this.serv.getUserById(+this.route.snapshot.params['uid'])[0];
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


        // add user //////////
        if (this.addUserMode) {
          this.editMode = false;
          this.msg = '';
          // uniqn number
          if (this.serv.isPhoneNumber(this.user.phone.trim())) {
            this.msg = 'This phone number already exists';
            return;
          }
          // add user
          this.serv.addUser(this.user);
          this.firstCheck = true;
          this.router.navigate(['/users']);
        } else {
          this.editMode = false;
          this.msg = '';
          const newUser = this.serv.updateUser(this.user);
          this.firstCheck = true;
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
