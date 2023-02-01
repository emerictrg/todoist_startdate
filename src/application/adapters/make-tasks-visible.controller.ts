import * as interactor from "../usecases/make-tasks-visible.interactor";
import { Task, ITask } from "../../domain/entities/task";

export interface LambdaEvent {
  body: object;
}

export interface EventParser {
  parse(event: LambdaEvent): Promise<ITask[]>;
}

export class ItaskToTaskAdapter {
  constructor(public readonly usecase: interactor.DrivingPort) {}

  async handle(unknownITasks: ITask[]): Promise<interactor.ResponseModel> {
    const tasks: Task[] = unknownITasks.map((itask) => {
      return new Task(itask.id);
    });
    const request = new interactor.RequestModel(tasks);
    return await this.usecase.changeVisibility(request);
  }
}
