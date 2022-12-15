import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Todo, TodoCreate, TodoUpdate } from "../todo/types";

@Injectable({
  providedIn: "root",
})
export class TodoService {
  constructor(private http: HttpClient) {}

  get(): Observable<Todo[]> {
    return this.http.get<Todo[]>(environment.url);
  }

  create(item: TodoCreate): Observable<Todo> {
    return this.http.post<Todo>(environment.url, item);
  }

  update(item: TodoUpdate): Observable<Todo> {
    return this.http.patch<Todo>(environment.url + `/${item.id}`, item);
  }

  delete(id: number) {
    return this.http.delete(environment.url + `/${id}`);
  }
}
