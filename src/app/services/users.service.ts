import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class UsersService {

  singleUser = false;
  users: User[] = [
    // { uid: 1, name: 'Ahmed Ali', phone: '0123456789', img: 1 },
    // { uid: 2, name: 'Sara Ali', phone: '0103444788', img: 2 },
    // { uid: 3, name: 'Salam sam', phone: '0113333785', img: 3 },
    // { uid: 4, name: 'Yara Ahmed', phone: '0103000087', img: 4 },
    // { uid: 5, name: 'Ali Ahmed', phone: '0105981367', img: 5 },
  ];
  searched: User[] = [];
  searchWord: string;
  apiurl = 'http://localhost:3000/contacts';

  headers = {
    'Content-Type': 'application/json'
  };


  constructor(private http: Http) {


    http.get(this.apiurl)
      .subscribe(res => {
        this.users = res.json();
      });

  }

  addUser(user) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    this.http.post(this.apiurl, JSON.stringify(user), options)
      .subscribe(res => {
        this.users.push(res.json());
      });
  }

  updateUser(user) {
    const id = user.uid;
    delete user.uid;
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    this.http.put(this.apiurl + '/' + id, JSON.stringify(user), options)
      .subscribe();

    const newUser = user;
    newUser.uid = id;
    return newUser;
  }

  deleteUser(user) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    this.http.delete(this.apiurl + '/' + user.uid, options)
      .subscribe(() => {
        if (user.uid !== 0) {
          this.users = this.users.filter(el => {
            return el.uid !== user.uid;
          });
        }
      });


  }

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
  getUserById(uid: number) {
    return this.users.filter(el => {
      return el.uid === uid;
    });
  }

  searchUsers(search) {
    this.searchWord = search;
    this.searched = [];
    if (search.trim()) {
      this.users.forEach(el => {
        const splitel = el.name.toLowerCase().split(search);
        if (splitel.length > 1) {
          this.searched.push(el);
        }
      });
    } else {
      this.searched = [];
      this.searchWord = null;
    }
  }

  isPhoneNumber(num) {
    let isPhone;
    this.users.forEach(el => {
      if (el.phone === num) {
        isPhone = el.phone;
      }
    });
    if (isPhone === num) {
      return true;
    } else {
      return false;
    }
  }
}
