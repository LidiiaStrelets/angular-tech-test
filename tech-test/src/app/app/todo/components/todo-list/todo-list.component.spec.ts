import { ComponentFixture, TestBed } from "@angular/core/testing";
import { of } from "rxjs";
import { TodoService } from "src/app/app/services/todo.service";
import { mockedTasks } from "src/app/app/services/todo.service.spec";

import { TodoListComponent } from "./todo-list.component";

const updatedTodo = { ...mockedTasks[0], description: "new description" };
fdescribe("TodoListComponent", () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  const todoServiceSpy = jasmine.createSpyObj<TodoService>([
    "create",
    "update",
    "delete",
    "get",
  ]);
  todoServiceSpy.get.and.returnValue(of(mockedTasks));
  todoServiceSpy.delete.and.returnValue(of({}));
  todoServiceSpy.update.and.returnValue(of(updatedTodo));
  todoServiceSpy.create.and.returnValue(of(mockedTasks[0]));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoListComponent],
      providers: [{ provide: TodoService, useValue: todoServiceSpy }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should initialize todo list", () => {
    expect(component.todoList).toEqual(jasmine.arrayContaining([]));
  });

  it("should initialize filtered todo list", () => {
    expect(component.filteredTodos).toEqual(jasmine.arrayContaining([]));
  });

  it("should get todo list", async () => {
    component.ngOnInit();

    expect(component.todoList).toEqual(jasmine.arrayContaining(mockedTasks));
  });

  it("should delete todo", () => {
    component.ngOnInit();

    component.handleDelete(1);

    expect(component.todoList).toEqual([mockedTasks[1]]);
    expect(component.todoList).not.toEqual(
      jasmine.arrayContaining([mockedTasks[0]])
    );
  });

  it("should edit todo", () => {
    component.ngOnInit();

    component.handleEdit(updatedTodo);

    expect(component.todoList).toEqual(
      jasmine.arrayContaining([mockedTasks[1], updatedTodo])
    );
  });

  it("should fikter correctly", () => {
    component.filter = "kitchen";
    expect(component.getFilteredTodos()).toEqual([mockedTasks[0]]);

    component.filter = "an";
    expect(component.getFilteredTodos()).toEqual(mockedTasks);

    component.filter = "fun";
    expect(component.getFilteredTodos()).toEqual([]);
  });
});
