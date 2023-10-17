import { Injectable } from '@angular/core';
import { Client } from '../interfaces/Client';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userDataKey = 'userData';
  private userDataSubject: BehaviorSubject<Client | undefined>;
  
  constructor() {
    const storedUserData = localStorage.getItem(this.userDataKey);
    const initialUserData = storedUserData ? JSON.parse(storedUserData) : undefined;
    this.userDataSubject = new BehaviorSubject<Client | undefined>(initialUserData);
  }

  setUserData(user: Client): void {
    this.userDataSubject.next(user);
    localStorage.setItem(this.userDataKey, JSON.stringify(user));
  }

  getUserData(): Client | undefined {
    return this.userDataSubject.value;
  }

  clearUserData(): void {
    this.userDataSubject.next(undefined);
    localStorage.removeItem(this.userDataKey);
  }

  getUserDataObservable() {
    return this.userDataSubject.asObservable();
  }
}
