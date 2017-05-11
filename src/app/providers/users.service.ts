import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Injectable()
export class UserService {
  private user;
  private users;
  private userDb:FirebaseListObservable<any[]>;
  constructor(private af: AngularFire) {
    this.userDb = this.af.database.list('/users');
    this.userDb.subscribe( (users) =>{
      this.users = users;
    });
  }
  getUserByKey(key){
    return this.af.database.object('/users/'+key);
  }
  getUserDbKey(id){
    let user = this.users.filter( (u) => {
      return u.userId === id;
    })[0];
    return user.$key || undefined;
  }
  addUser(signupForm, user){
    let userObj = {
      email: signupForm.value.email,
      password: signupForm.value.password,
      userId: user.uid,
      firstName: null,
      lastName: null,
      address: null
    };
    this.userDb.push(userObj);
  }
  updateUserData(uid,fn,ln,addr){
    let key = this.getUserDbKey(uid);
    this.userDb.update(key,{
      firstName: fn,
      lastName:ln,
      address: addr
    });
  }
}
