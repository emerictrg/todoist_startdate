import { ActivateTasksInputPort } from '../usecases/activate-tasks.interactor';
import { Task } from '../../domain/entities/task'

export class ActivateTasksFromArrayOfIds implements ActivateTasksInputPort {
    constructor(public ids: string[]) {}

    get tasksToActivate(): Task[] {
        return this.ids.map(id => {
            return new Task(id);
        });
    }
}
