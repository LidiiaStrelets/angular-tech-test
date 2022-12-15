import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TodoListComponent } from "./components/todo-list/todo-list.component";
import { TodoItemComponent } from "./components/todo-item/todo-item.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FilterComponent } from "./components/filter/filter.component";
import { TodoFormComponent } from "./components/todo-form/todo-form.component";
import { TodoComponent } from "./todo.component";

@NgModule({
  declarations: [
    TodoListComponent,
    TodoItemComponent,
    FilterComponent,
    TodoFormComponent,
    TodoComponent,
  ],
  exports: [
    TodoListComponent,
    TodoItemComponent,
    FilterComponent,
    TodoFormComponent,
    TodoComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
})
export class TodoModule {}
