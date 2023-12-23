import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Comment } from '../interfaces/advert';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  users: User[] = [];
  currentUser: User = {
    id: 0,
    name: '',
    email: '',
    password: '',
    gender: '',
    age: 0,
    phone: '',
    favorites: [],
  }  
  isAuthorized: boolean = false;

  forPrivateAccess = new BehaviorSubject<boolean>(this.isAuthorized)
  accessData$ = this.forPrivateAccess.asObservable();

  constructor(
    private http: HttpClient,
  ) {
    this.http.get<User[]>('../assets/users.json').subscribe(data => {
      this.users = data;            
    })
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('../assets/users.json')
  }

  generateID(array: User[] | Comment[]): number {
    let randomID = Math.floor(Math.random() * 1000000)
    return this.checkMatchID(randomID, array) ? this.generateID(array) : randomID;   
  }

  checkMatchID(id: number, array: User[] | Comment[]): boolean {
    return array.some(item => item.id === id);
  }

  checkName(user: User): boolean[] {
    return [
      this.users.some(item => item.name === user.name),
      this.users.some(item => item.email === user.email)
    ]
  }

  addUser(user: User): boolean[] {
    let matchesArray = this.checkName(user)
    if(matchesArray.includes(true)) {
      return matchesArray;
    } else {
      user.id = this.generateID(this.users);
      this.users.push(user);      
      return [false];
    }
  }

  checkAuthorization(name: string, password: string): boolean {   
    this.isAuthorized = this.users.some(user => (user.name === name || user.email === name) && user.password === password);
    
    if(this.isAuthorized) {
      this.currentUser = this.users.find(user => (user.name === name || user.email === name) && user.password === password)!
    }

    return this.isAuthorized
  }

  accessIsOpen(): boolean {
    this.forPrivateAccess.next(this.isAuthorized);
    return this.isAuthorized
  }

  editUser(editedUser: User): void {
    this.users = this.users.map(user => {
      if(user.id === editedUser.id) {
        return editedUser
      } else {
        return user
      }
    })
  }
}
