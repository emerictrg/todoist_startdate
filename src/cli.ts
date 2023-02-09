import Config from "./config";
import { TodoistApi } from "@doist/todoist-api-typescript";
import { TasksProvider } from "./infrastructure/todoist/tasks-provider";
import { TodoistGateway } from "./infrastructure/todoist/make-tasks-visible.gateway";
import { ITask } from "./domain/entities/task";
import { ItaskToTaskAdapter } from "./application/adapters/make-tasks-visible.controller";
import { TasksToString } from "./application/adapters/make-tasks-visible.tostring.presenter";
import { MakeTasksVisible } from "./application/usecases/make-tasks-visible.interactor";

class CliHandler {
  async handle(itemId: string) {
    const api = new TodoistApi(Config.getTodoistAccessToken());
    const tasksProvider = new TasksProvider(api);
    const todoistTasks: ITask[] = await tasksProvider.fetchTasks(itemId);
    const usecase: MakeTasksVisible = new MakeTasksVisible(
      new TodoistGateway(api)
    );
    const adapter: ItaskToTaskAdapter = new ItaskToTaskAdapter(usecase);
    const response = await adapter.handle(todoistTasks);
    const presenter = new TasksToString(response);
    console.log(presenter.toString());
  }
}

const handler = new CliHandler();
handler.handle(process.argv[2]);
