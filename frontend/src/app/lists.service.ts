import { Injectable } from '@angular/core';
import { List } from './list';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ListsService {
  private listsUrl = 'http://localhost:5000/api/lists/';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private http: HttpClient) {}

  getLists(): Observable<List[]> {
    return this.http
      .get<List[]>(this.listsUrl, this.httpOptions)
      .pipe(catchError(this.handleError<List[]>('getLists', [])));
  }

  getList(id: string): Observable<List> {
    return this.http
      .get<List>(`${this.listsUrl}list/${id}`, this.httpOptions)
      .pipe(catchError(this.handleError<List>('getList')));
  }

  addList(name: string): Observable<any> {
    return this.http.post<List>(this.listsUrl, { name }, this.httpOptions).pipe(
      tap((newList: List) => console.log(`added list id=${newList._id}`)),
      catchError(this.handleError<List>('addList'))
    );
  }

  deleteList(id: string): Observable<List> {
    const url = `${this.listsUrl}list/${id}`;
    return this.http
      .delete<List>(url, this.httpOptions)
      .pipe(catchError(this.handleError<List>('deleteList')));
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
