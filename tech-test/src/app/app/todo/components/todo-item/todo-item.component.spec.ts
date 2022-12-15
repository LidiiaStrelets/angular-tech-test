import { ComponentFixture, TestBed } from "@angular/core/testing";
import { mockedTasks } from "src/app/app/services/todo.service.spec";

import { TodoItemComponent } from "./todo-item.component";

fdescribe("TodoItemComponent", () => {
  let component: TodoItemComponent;
  let fixture: ComponentFixture<TodoItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should set id to edit", () => {
    component.editTodo(2);

    expect(component.toEdit).toBe(2);
  });

  it("should reset id to edit", () => {
    component.handleEdit(mockedTasks[0]);

    expect(component.toEdit).toBe(-1);
  });

  it("should trigger checkmark", () => {
    component.item = mockedTasks[0];

    expect(component.item.done).toBeFalse();

    const date = new Date().toISOString().split("T")[0];

    component.handleMark();

    expect(component.item.done).toBe(date);

    component.handleMark();

    expect(component.item.done).toBeFalse();
  });
});
