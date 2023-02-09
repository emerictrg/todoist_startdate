import {
  Presenter,
  ResponseModel,
} from "../usecases/make-tasks-visible.interactor";

export class TasksToString implements Presenter {
  constructor(public response: ResponseModel) {}

  public toString() {
    return this.response.activatedTasks.map((task) => {
      return `Task #${task.id}`;
    });
  }
}
