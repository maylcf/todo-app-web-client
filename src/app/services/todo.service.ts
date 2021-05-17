import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Todo } from '../model/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  url = environment.apiBase + '/api/todo'

  constructor(private httpClient: HttpClient) { }

  save(todo: Todo): Observable<Todo> {
    return this.httpClient.post<Todo>(this.url, todo);
  }

  update(todo: Todo): Observable<any> {
    return this.httpClient.put<Todo>(`${this.url}/${todo.id}`, todo);
  }

  list(): Observable<Todo[]> {
    return this.httpClient.get<Todo[]>(this.url);
  }

  delete(todo: Todo): Observable<any> {
    return this.httpClient.delete<any>(`${this.url}/${todo.id}`);
  }
}
