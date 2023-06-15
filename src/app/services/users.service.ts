import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { User } from 'src/types/User';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  refresh$$ = new BehaviorSubject(null);
  users$: Observable<User[]>;

  constructor(private http: HttpClient) {
    this.users$ = this.refresh$$.pipe(switchMap(() => this.getUsers()));
  }

  getUsers() {
    return this.http.get<User[]>(
      'http://localhost:4000/users'
    );
  }

  createUser(user: User) {
    return this.http
      .post<User>('http://localhost:4000/users', user)
      .pipe(tap(() => this.refresh$$.next(null)));
  }

  deleteUser(id: number) {
    return this.http
      .delete<User>(`http://localhost:4000/users/${id}`)
      .pipe(tap(() => this.refresh$$.next(null)));
  }
}
