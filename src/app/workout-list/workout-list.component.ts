import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { User } from '../models/models';

@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.css'],
})
export class WorkoutListComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  searchTerm = '';
  filterType = '';
  workoutTypes = ['Running', 'Cycling', 'Swimming', 'Yoga'];
  paginatedUsers: User[] = [];
  totalUsers = 0;
  currentPage = 1;
  itemsPerPage = 5;
  displayedColumns: string[] = ['name', 'workouts'];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.users = this.dataService.getUsers();
    this.filteredUsers = [...this.users];
    this.totalUsers = this.filteredUsers.length;
    this.paginate();
  }

  paginate(page: number = 1) {
    this.currentPage = page;
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedUsers = this.filteredUsers.slice(start, end);
  }

  onPageChange(page: number) {
    this.paginate(page);
  }

  onSearch() {
    this.filteredUsers = this.users.filter(
      (user) =>
        user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.workouts.some((workout) =>
          workout.type.toLowerCase().includes(this.searchTerm.toLowerCase())
        )
    );
    this.totalUsers = this.filteredUsers.length;
    this.paginate(1);
  }

  onFilter() {
    if (this.filterType === '') {
      return;
    }
    this.filteredUsers = this.filteredUsers.filter((user) =>
      user.workouts.some((workout) => workout.type === this.filterType)
    );
    this.totalUsers = this.filteredUsers.length;
    this.paginate(1);
  }

  showResults() {
    this.onSearch();
    this.onFilter();
  }
}
