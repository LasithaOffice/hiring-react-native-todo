import { Task } from "./Task";

export interface TasksSlice {
  tasks: Task[],
  currentEdit: Task | undefined
}