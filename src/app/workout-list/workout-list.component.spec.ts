import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { WorkoutListComponent } from './workout-list.component';
import { DataService } from '../data.service';
import { User } from '../models/models';
import { of } from 'rxjs';

describe('WorkoutListComponent', () => {
  let component: WorkoutListComponent;
  let fixture: ComponentFixture<WorkoutListComponent>;
  let mockDataService: jasmine.SpyObj<DataService>;

  beforeEach(async () => {
    mockDataService = jasmine.createSpyObj('DataService', ['getUsers']);

    await TestBed.configureTestingModule({
      declarations: [WorkoutListComponent],
      providers: [{ provide: DataService, useValue: mockDataService }],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkoutListComponent);
    component = fixture.componentInstance;

    const mockUsers: User[] = [
      { id: 1, name: 'Alice', workouts: [{ type: 'Running', minutes: 30 }] },
      { id: 2, name: 'Bob', workouts: [{ type: 'Cycling', minutes: 45 }] },
      { id: 3, name: 'Charlie', workouts: [{ type: 'Swimming', minutes: 60 }] },
      { id: 4, name: 'David', workouts: [{ type: 'Yoga', minutes: 40 }] },
      { id: 5, name: 'Eve', workouts: [{ type: 'Running', minutes: 30 }] },
      { id: 6, name: 'Frank', workouts: [{ type: 'Cycling', minutes: 45 }] },
    ];

    mockDataService.getUsers.and.returnValue(mockUsers);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
