import { Injectable } from '@angular/core';
import { Task } from './task';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private tasksUrl = 'http://localhost:5000/api/tasks/';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private http: HttpClient) {}

  getTasks(type?: string): Observable<Task[]> {
     if (!type) {
      return this.http
        .get<Task[]>(this.tasksUrl, this.httpOptions)
        .pipe(catchError(this.handleError<Task[]>('getTasks', [])));
     }
     return this.http
      .get<Task[]>(`${this.tasksUrl}${type}`)
      .pipe(catchError(this.handleError<Task[]>('getTasks', [])));
  }

  addTask(name: string, date: Date, comment: string): Observable<any> {
    return this.http
      .post<Task>(
        this.tasksUrl,
        { name, date, comment, task_state: 'active' },
        this.httpOptions
      )
      .pipe(
        tap((newTask: Task) => console.log(`added task id=${newTask._id}`)),
        catchError(this.handleError<Task>('addTask'))
      );
  }

  deleteTask(id: string): Observable<Task> {
    const url = `${this.tasksUrl}task/${id}`;
    return this.http
      .delete<Task>(url, this.httpOptions)
      .pipe(catchError(this.handleError<Task>('deleteTask')));
  }

  editTask(task: Task): Observable<any> {
    return this.http
      .put(`${this.tasksUrl}task/${task._id}`, task, this.httpOptions)
      .pipe(catchError(this.handleError<Task>('editTask')));
  }

  private handleError<T>(
    operation = 'operation',
    result?: T
  ): (a: any) => Observable<T> {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
