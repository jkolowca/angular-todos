import { Injectable } from '@angular/core';
import { Task } from '../interfaces/task';
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

  getTasks(type: string, listId: string): Observable<Task[]> {
     if (!listId) {
      return this.http
       .get<Task[]>(`${this.tasksUrl}${type}`)
       .pipe(catchError(this.handleError<Task[]>('getTasks', [])));
     }
     return this.http
      .get<Task[]>(`${this.tasksUrl}${type}/${listId}`)
      .pipe(catchError(this.handleError<Task[]>('getTasks', [])));
  }

  addTask(listId: string, t: { name: string, date: Date, comment: string }): Observable<any> {
    return this.http
      .post<Task>(
        this.tasksUrl,
        { listId, name: t.name, date: t.date, comment: t.comment, taskState: 'active' },
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

  getTasksCount(type: string, listId: string): Observable<any> {
    return this.http
      .get<Task[]>(`${this.tasksUrl}count/${type}/${listId}`)
      .pipe(catchError(this.handleError<Task[]>('getTasks', [])));
  }

  private handleError<T>( operation?: string, result?: T): (a: any) => Observable<T> {
    return (error: any): Observable<T> => {
      console.error(`${error} at: ${operation}`);
      return of(result as T);
    };
  }
}
