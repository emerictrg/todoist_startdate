import { Task } from "../../domain/entities/task";

export class RequestModel {
  constructor(public tasksToActivate: Task[] = []) {}
}

export class ResponseModel {
  activatedTasks: Task[];

  constructor(tasks: Task[] = []) {
    this.activatedTasks = tasks;
  }
}

export interface DataGatewayResponse {
  isSuccessfull: boolean;
  messages: string[];
}

export interface DataGateway {
  saveState(tasks: Task[]): Promise<DataGatewayResponse>;
}

export interface DrivingPort {
  changeVisibility(request: RequestModel): Promise<ResponseModel>;
}

export interface Presenter {
  response: ResponseModel;
}

export class MakeTasksVisible implements DrivingPort {
  constructor(public gateway: DataGateway) {}

  public async changeVisibility(request: RequestModel): Promise<ResponseModel> {
    const response = new ResponseModel();
    response.activatedTasks = request.tasksToActivate.map((task) => {
      task.isActivated = true;
      return task;
    });

    const gatewayResponse = await this.gateway.saveState(
      response.activatedTasks
    );
    if (!gatewayResponse.isSuccessfull) {
      throw new Error("tasks was not activated properly on save");
    }
    return Promise.resolve(response);
  }
}
