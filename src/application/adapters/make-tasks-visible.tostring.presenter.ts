import {
  Presenter,
  ResponseModel,
} from "../usecases/make-tasks-visible.interactor";
import { Task } from "../../domain/entities/task";

export class TasksToString implements Presenter {
  constructor(public response: ResponseModel) {}

  public toString() {
    return this.response.activatedTasks.map((task) => {
      return `Task #${task.id}`;
    });
  }
}
