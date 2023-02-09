import Config from "./config";
import { TodoistApi } from "@doist/todoist-api-typescript";
import { TasksProvider } from "./infrastructure/todoist/tasks-provider";
import { TodoistGateway } from "./infrastructure/todoist/make-tasks-visible.gateway";
import { ITask } from "./domain/entities/task";
import { ItaskToTaskAdapter } from "./application/adapters/make-tasks-visible.controller";
import { TasksToString } from "./application/adapters/make-tasks-visible.tostring.presenter";
import { MakeTasksVisible } from "./application/usecases/make-tasks-visible.interactor";

type ReminderEventBody = {
  event_data: {
    due: {
      date: string;
      is_recurring: boolean;
      lang: string;
      string: string;
      timezone: string;
    };
    id: string;
    is_deleted: number;
    item_id: string;
    notify_uid: string;
    type: string;
  };
  event_name: string;
  initiator: {
    email: string;
    full_name: string;
    id: string;
    image_id: string | null;
    is_premium: boolean;
  };
  user_id: string;
  version: string;
};
type ReminderExpectedEvent = {
  body: Partial<ReminderEventBody>;
};

export const lambdaHandler = async (event: ReminderExpectedEvent) => {
  if (event.body.event_data === undefined) {
    console.log(event);
    throw new Error("no data provided");
  }

  const api = new TodoistApi(Config.getTodoistAccessToken());
  const tasksProvider = new TasksProvider(api);
  const todoistTasks: ITask[] = await tasksProvider.fetchTasks(
    event.body.event_data.item_id
  );
  const usecase: MakeTasksVisible = new MakeTasksVisible(
    new TodoistGateway(api)
  );
  const adapter: ItaskToTaskAdapter = new ItaskToTaskAdapter(usecase);
  const response = await adapter.handle(todoistTasks);
  const presenter = new TasksToString(response);
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: presenter.toString().join(","),
    }),
  };
};
