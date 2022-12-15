import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TodoFormComponent } from "./todo-form.component";

fdescribe("TodoFormComponent", () => {
  let component: TodoFormComponent;
  let fixture: ComponentFixture<TodoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should have a form", () => {
    expect(component.todoForm).toBeDefined;
  });

  it("should reset the form", () => {
    component.eventType = "create";

    component.handleSubmit();

    expect(component.todoForm.value).toEqual({
      label: null,
      description: null,
      category: null,
    });
  });
});
