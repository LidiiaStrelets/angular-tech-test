export interface Todo {
  id: number;
  label: string;
  description: string;
  category: string;
  done?: boolean | string;
}

export type TodoEvent = "create" | "edit";

export interface TodoUpdate extends Partial<Todo> {}

export interface TodoCreate extends Omit<Todo, "id"> {}
