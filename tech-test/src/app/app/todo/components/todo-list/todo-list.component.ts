import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import { TodoService } from "src/app/app/services/todo.service";
import { Todo } from "../../types";

@Component({
  selector: "app-todo-list",
  templateUrl: "./todo-list.component.html",
  styleUrls: ["./todo-list.component.scss"],
})
export class TodoListComponent implements OnInit, OnChanges {
  @Input() newTodo: Todo;
  @Input() filter = "";

  todoList: Todo[] = [];
  filteredTodos: Todo[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.get().subscribe((res) => {
      this.todoList = res;
      this.filteredTodos = res;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (let propName in changes) {
      let change = changes[propName];

      let value = change.currentValue;

      if (propName === "newTodo" && value) {
        this.todoService.create(value).subscribe((res) => {
          this.todoList = [...this.todoList, res];
        });
      }
    }
  }

  TrackTodo = (index: number, item: Todo) => item.id;

  handleDelete = (id: number) => {
    this.todoService.delete(id).subscribe(() => {
      this.todoList = this.todoList.filter(({ id: itemId }) => itemId !== id);
    });
  };

  handleEdit = (item: Todo) => {
    this.todoService.update(item).subscribe((res) => {
      this.todoList = this.todoList.map((todo) =>
        todo.id === item.id ? item : todo
      );
    });
  };

  getFilteredTodos() {
    const lowercased = this.filter.toLowerCase();
    return this.filter
      ? this.todoList.filter(
          ({ label, description, category }) =>
            label.toLowerCase().includes(lowercased) ||
            description.toLowerCase().includes(lowercased) ||
            category.toLowerCase().includes(lowercased)
        )
      : this.todoList;
  }
}
