import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable()
export class UsersService {

  singleUser = false;
  users: User[] = [
    { id: 1, name: 'Ahmed Ali', phone: '0123456789', img: 1 },
    { id: 2, name: 'Sara Ali', phone: '0103444788', img: 2 },
    { id: 3, name: 'Salam sam', phone: '0113333785', img: 3 },
    { id: 4, name: 'Yara Ahmed', phone: '0103000087', img: 4 },
    { id: 5, name: 'Ali Ahmed', phone: '0105981367', img: 5 },
  ];
  searched: User[] = [];
  searchWord: string;

  constructor() { }
  getUserMode() {
    return this.singleUser;
  }
  setUserMode(val: boolean) {
    this.singleUser = val;
  }


  getUsers() {

    if (this.searchWord) {
      return this.searched.sort((a, b) => {
        const x: string = a.name.toLowerCase();
        const y: string = b.name.toLowerCase();
        if (x < y) { return -1; }
        if (x > y) { return 1; }
        return 0;
      });
    } else {
      return this.users.sort((a, b) => {
        const x: string = a.name.toLowerCase();
        const y: string = b.name.toLowerCase();
        if (x < y) { return -1; }
        if (x > y) { return 1; }
        return 0;
      });
    }

  }
  getUserById(id: number) {
    return this.users.filter(el => {
      return el.id === id;
    });
  }

  searchUsers(search) {
    this.searchWord = search;
    this.searched = [];
    if (search.trim()) {
      this.users.forEach(el => {
        let splitel = el.name.toLowerCase().split(search);
        if (splitel.length > 1) {
          this.searched.push(el);
        }
      });
    } else {
      this.searched = [];
      this.searchWord = null;
    }
  }
  addUser(user) {
    this.users.push(user);
    return user.id;
  }

  updateUser(user) {
    this.users.forEach((el, i) => {
      if (el.id === user.id) {
        this.users[i] = user;
      }
    });
  }

  deleteUser(user) {
    if (user.id !== 0) {
      this.users = this.users.filter(el => {
        return el.id !== user.id;
      });
    }
  }
  isPhoneNumber(num) {
    let isPhone;
    this.users.forEach(el => {
      if (el.phone === num) {
        isPhone = el.phone;
      }
    });
    if(isPhone === num ) {
      return true;
    } else {
      return false;
    }
  }
}
