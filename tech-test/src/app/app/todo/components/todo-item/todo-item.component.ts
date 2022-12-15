import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Todo } from "../../types";

@Component({
  selector: "app-todo-item",
  templateUrl: "./todo-item.component.html",
  styleUrls: ["./todo-item.component.scss"],
})
export class TodoItemComponent implements OnInit {
  @Input() item: Todo;
  @Output() onDeleteTodo = new EventEmitter<number>();
  @Output() onEditTodo = new EventEmitter<Todo>();

  toEdit = -1;

  doneText = "mark as undone";
  undoneText = "mark as done";

  constructor() {}

  ngOnInit(): void {}

  deleteTodo = (id: number) => this.onDeleteTodo.emit(id);

  editTodo = (id: number) => {
    this.toEdit = id;
  };

  handleEdit = (newItem: Todo) => {
    this.toEdit = -1;
    this.onEditTodo.emit(newItem);
  };

  handleMark = () => {
    if (!this.item.done) {
      this.item.done = new Date().toISOString().split("T")[0];
    } else {
      this.item.done = false;
    }

    this.onEditTodo.emit(this.item);
  };
}
