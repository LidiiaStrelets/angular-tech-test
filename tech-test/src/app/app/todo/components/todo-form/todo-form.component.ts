import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Todo, TodoEvent } from "../../types";

@Component({
  selector: "app-todo-form",
  templateUrl: "./todo-form.component.html",
  styleUrls: ["./todo-form.component.scss"],
})
export class TodoFormComponent implements OnInit {
  @Input() buttonText = "";
  @Input() eventType: TodoEvent;
  @Input() item?: Todo;

  @Output() onEdit = new EventEmitter<Todo>();
  @Output() onTodoCreate = new EventEmitter<Todo>();

  todoForm = new FormGroup({
    label: new FormControl(""),
    description: new FormControl(""),
    category: new FormControl(""),
  });

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    for (let propName in changes) {
      let change = changes[propName];

      let value = change.currentValue;

      if (propName === "item" && value) {
        this.todoForm.patchValue({
          label: value.label,
          description: value.description,
          category: value.category,
        });
      }
    }
  }

  handleSubmit = () => {
    const newTodo = this.todoForm.value;
    if (this.eventType === "edit") {
      this.onEdit.emit({ ...newTodo, id: this.item.id });
    } else {
      this.onTodoCreate.emit(newTodo);
      this.todoForm.reset();
    }
  };
}
