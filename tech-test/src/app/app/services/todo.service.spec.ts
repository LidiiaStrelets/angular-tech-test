import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { environment } from "src/environments/environment";
import { TodoCreate, TodoUpdate } from "../todo/types";

import { TodoService } from "./todo.service";

export const mockedTasks = [
  {
    id: 1,
    label: "Kitchen Cleanup",
    description: "Clean my dirty kitchen",
    category: "house",
    done: false,
  },
  {
    id: 2,
    label: "Taxes",
    description:
      "Start doing my taxes and contact my accountant jhon for advice",
    category: "bureaucracy",
    done: "2022-12-15",
  },
];

fdescribe("TodoService", () => {
  let service: TodoService;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(TodoService);
    controller = TestBed.inject(HttpTestingController);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should call a get method and return an array of todos", () => {
    service.get().subscribe((res) => {
      expect(res).toEqual(mockedTasks);
    });

    const req = controller.expectOne({
      method: "GET",
      url: environment.url,
    });

    req.flush(mockedTasks);
  });
  it("should call update and return the updated todo", () => {
    const updatedTodo: TodoUpdate = {
      id: 1,
      label: "New title",
      description: "description",
    };

    const expected = { ...mockedTasks[0], ...updatedTodo };

    service.update(updatedTodo).subscribe((data) => {
      expect(data).toEqual(expected);
    });

    const req = controller.expectOne({
      method: "PATCH",
      url: `${environment.url}/${updatedTodo.id}`,
    });

    req.flush(expected);
  });

  it("should call create and return the new item", () => {
    const newTodo: TodoCreate = {
      label: "test edit",
      description: "description text",
      category: "task",
    };

    service.create(newTodo).subscribe((data) => {
      expect(data).toEqual(jasmine.objectContaining({ ...newTodo }));
    });

    const req = controller.expectOne({
      method: "POST",
      url: environment.url,
    });

    req.flush(newTodo);
  });

  it("should call delete and return empty object", () => {
    service.delete(1).subscribe((data) => {
      expect(data).toEqual({});
    });

    const req = controller.expectOne({
      method: "DELETE",
      url: `${environment.url}/1`,
    });

    req.flush({});
  });
});
