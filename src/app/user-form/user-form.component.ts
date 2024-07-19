import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { User } from '../models/models';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent {
  newUser: User = { id: 0, name: '', workouts: [] };
  newWorkout = { type: '', minutes: 0 };
  workoutTypes = ['Running', 'Cycling', 'Swimming', 'Yoga'];
  showToast = false;

  constructor(private dataService: DataService) {}

  addWorkout() {
    if (this.newUser.name && this.newWorkout.type && this.newWorkout.minutes) {
      const users = this.dataService.getUsers();

      const existingUser = users.find(
        (user) => user.name === this.newUser.name
      );

      if (existingUser) {
        existingUser.workouts.push(this.newWorkout);
        this.dataService.updateUser(existingUser);
      } else {
        this.newUser.id = users.length + 1;
        this.newUser.workouts.push(this.newWorkout);
        this.dataService.addUser(this.newUser);
      }

      this.resetForm();
      this.showToast = true;
      setTimeout(() => (this.showToast = false), 4000);
    }
  }

  resetForm() {
    this.newUser = { id: 0, name: '', workouts: [] };
    this.newWorkout = { type: '', minutes: 0 };
  }
}
