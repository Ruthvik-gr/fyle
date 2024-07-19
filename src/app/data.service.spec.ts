import { TestBed } from '@angular/core/testing';
import { DataService } from './data.service';
import { User } from './models/models';

describe('DataService', () => {
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a user', () => {
    const user: User = { id: 4, name: 'Alice Doe', workouts: [] };
    spyOn(service, 'getUsers').and.returnValue([]);
    spyOn(localStorage, 'setItem').and.callThrough();

    service.addUser(user);

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    expect(users.length).toBe(1);
    expect(users[0]).toEqual(user);
  });

  it('should update a user', () => {
    const user: User = {
      id: 1,
      name: 'John Doe',
      workouts: [{ type: 'Running', minutes: 30 }],
    };
    spyOn(service, 'getUsers').and.returnValue([
      { id: 1, name: 'John Doe', workouts: [] },
    ]);
    spyOn(localStorage, 'setItem').and.callThrough();

    service.updateUser(user);

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    expect(users.length).toBe(1);
    expect(users[0]).toEqual(user);
  });

  it('should not add a user with an empty string name', () => {
    const emptyNameUser: User = { id: 0, name: '', workouts: [] };

    spyOn(localStorage, 'setItem').and.callThrough();

    service.addUser(emptyNameUser);
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    expect(users.length).toBe(0);
  });
});
