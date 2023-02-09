import { TodoistApi, TodoistRequestError } from "@doist/todoist-api-typescript";
import { Task } from "../../domain/entities/task";
import {
  DataGateway,
  DataGatewayResponse,
} from "../../application/usecases/make-tasks-visible.interactor";

export class TodoistGatewayResponse implements DataGatewayResponse {
  constructor(public isSuccessfull: boolean, public messages: string[] = []) {}
}

export class TodoistGateway implements DataGateway {
  private api: TodoistApi;

  constructor(configuredApi: TodoistApi) {
    this.api = configuredApi;
  }

  async saveState(tasks: Task[]): Promise<DataGatewayResponse> {
    return Promise.all(
      tasks.map((task: Task) => {
        return this.api.updateTask(task.id, { labels: ["next"] });
      })
    )
      .then(() => {
        return new TodoistGatewayResponse(true);
      })
      .catch((error: TodoistRequestError) => {
        const messages: string[] = [];
        if (error.isAuthenticationError()) {
          messages.push("authentication error");
          if (error.httpStatusCode) {
            messages.push(error.httpStatusCode.toString());
          }
        } else if (error.message !== undefined) {
          messages.push(error.message.toString());
        } else {
          messages.push("error unknown");
        }
        return new TodoistGatewayResponse(false, messages);
      });
  }
}
