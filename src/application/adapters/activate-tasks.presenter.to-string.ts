import { ActivateTasksOutputPort } from '../usecases/activate-tasks.interactor';
import { Task } from '../../domain/entities/task';

export class ActivateTasksToString implements ActivateTasksOutputPort {
    constructor(public tasks: Task[]) {}

    get presentedTasks() {
        return this.tasks.map((task: Task) => {
            return  `task ${task.id}`;
        });
    }
}
