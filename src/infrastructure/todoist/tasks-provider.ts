import { TodoistApi, Task } from "@doist/todoist-api-typescript";
import { ITask } from "../../domain/entities/task";
import { TodoistContentParser } from "./content-parser";

export class TodoistTask implements ITask {
  constructor(public id: string) {}
}

export class TasksProvider {
  private api: TodoistApi;

  constructor(configuredApi: TodoistApi) {
    this.api = configuredApi;
  }

  async fetchTasks(taskId: string): Promise<ITask[]> {
    const originTask: Task = await this.api.getTask(taskId);
    const filter = TodoistContentParser.parse(originTask.content);
    const targetedTasks: Task[] = await this.api.getTasks({ filter: filter });
    return targetedTasks.map((task) => {
      return new TodoistTask(task.id);
    });
  }
}
