import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { WorkoutChartComponent } from './workout-chart.component';
import { DataService } from '../data.service';
import { User } from '../models/models';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

const users: User[] = [
  {
    id: 1,
    name: 'Alice',
    workouts: [
      { type: 'Running', minutes: 30 },
      { type: 'Cycling', minutes: 45 },
    ],
  },
  { id: 2, name: 'Bob', workouts: [{ type: 'Swimming', minutes: 60 }] },
];

describe('WorkoutChartComponent', () => {
  let component: WorkoutChartComponent;
  let fixture: ComponentFixture<WorkoutChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkoutChartComponent],
      providers: [
        { provide: DataService, useValue: { getUsers: () => users } },
        { provide: PLATFORM_ID, useValue: 'browser' },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkoutChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should generate chart data correctly', () => {
    const user = users[0];
    component.generateChartData(user);

    expect(component.chartData).toBeDefined();
    expect(component.chartData?.labels).toEqual(['Running', 'Cycling']);
    expect(component.chartData?.datasets[0].data).toEqual([30, 45]);
  });

  it('should update selected user and chart data on user selection', () => {
    component.selectedUser = users[0];
    component.generateChartData(component.selectedUser);

    expect(component.selectedUser).toEqual(users[0]);
    expect(component.chartData).toBeDefined();
    expect(component.chartData?.labels).toEqual(['Running', 'Cycling']);
  });
});
