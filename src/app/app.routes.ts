import { Routes } from '@angular/router';
import { UserFormComponent } from './user-form/user-form.component';
import { WorkoutListComponent } from './workout-list/workout-list.component';
import { WorkoutChartComponent } from './workout-chart/workout-chart.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: 'user-form', component: UserFormComponent },
  { path: 'workout-list', component: WorkoutListComponent },
  { path: 'workout-chart', component: WorkoutChartComponent },
  { path: '', component: HomeComponent },
];
