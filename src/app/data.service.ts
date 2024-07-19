import { Injectable } from '@angular/core';
import { User } from './models/models';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private storageKey = 'users';

  constructor() {
    this.initializeData();
  }

  private initializeData(): void {
    const defaultUsers: User[] = [
      {
        id: 1,
        name: 'John Doe',
        workouts: [
          { type: 'Running', minutes: 30 },
          { type: 'Cycling', minutes: 45 },
        ],
      },
      {
        id: 2,
        name: 'Jane Smith',
        workouts: [
          { type: 'Swimming', minutes: 60 },
          { type: 'Running', minutes: 20 },
        ],
      },
      {
        id: 3,
        name: 'Mike Johnson',
        workouts: [
          { type: 'Yoga', minutes: 50 },
          { type: 'Cycling', minutes: 40 },
        ],
      },
    ];

    const users = this.getUsers();
    if (users.length === 0) {
      localStorage.setItem(this.storageKey, JSON.stringify(defaultUsers));
    }
  }

  getUsers(): User[] {
    const users = localStorage.getItem(this.storageKey);
    return users ? JSON.parse(users) : [];
  }

  addUser(user: User): void {
    if (!user.name || typeof user.name !== 'string') {
      return;
    }

    const users = this.getUsers();
    const existingUser = users.find((u) => u.name === user.name);

    if (existingUser) {
      existingUser.workouts.push(...user.workouts);
    } else {
      user.id = users.length + 1;
      users.push(user);
    }

    localStorage.setItem(this.storageKey, JSON.stringify(users));
  }

  updateUser(updatedUser: User): void {
    let users = this.getUsers();
    users = users.map((user) =>
      user.id === updatedUser.id ? updatedUser : user
    );
    localStorage.setItem(this.storageKey, JSON.stringify(users));
  }
}
