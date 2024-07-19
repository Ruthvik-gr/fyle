import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Chart, ChartData, ChartOptions, registerables } from 'chart.js';
import { DataService } from '../data.service';
import { User } from '../models/models';

Chart.register(...registerables);

@Component({
  selector: 'app-workout-chart',
  templateUrl: './workout-chart.component.html',
})
export class WorkoutChartComponent implements OnInit {
  chartData: ChartData<'bar'> | undefined;
  chartOptions: ChartOptions = { responsive: true };
  users: User[] = [];
  selectedUser: User | undefined;

  constructor(
    private dataService: DataService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.users = this.dataService.getUsers();
    }
  }

  generateChartData(user: User) {
    const labels = user.workouts.map((workout) => workout.type);
    const data = user.workouts.map((workout) => workout.minutes);

    this.chartData = {
      labels,
      datasets: [
        {
          data,
          label: 'Workout Minutes',
          backgroundColor: 'rgba(0, 123, 255, 0.5)',
        },
      ],
    };
  }

  onUserSelect(event: Event) {
    const target = event.target as HTMLSelectElement;
    const userId = Number(target.value);
    this.selectedUser = this.users.find((user) => user.id === userId);
    if (this.selectedUser) {
      this.generateChartData(this.selectedUser);
    }
  }
}
