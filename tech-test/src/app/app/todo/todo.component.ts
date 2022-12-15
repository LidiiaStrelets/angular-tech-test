import { Component, OnInit } from "@angular/core";
import { Todo } from "./types";

@Component({
  selector: "app-todo",
  templateUrl: "./todo.component.html",
  styleUrls: ["./todo.component.scss"],
})
export class TodoComponent implements OnInit {
  newTodo: Todo;
  filter = "";

  handleTodo = (item: Todo) => (this.newTodo = item);
  setFilter = (filter: string) => (this.filter = filter);

  constructor() {}

  ngOnInit(): void {}
}
