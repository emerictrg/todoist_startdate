import { TodoistApi, Task as TodoistTask } from '@doist/todoist-api-typescript';
import { Task } from '../../domain/entities/task';
import { 
    DataGateway,
    DataGatewayResponse
} from '../../application/usecases/make-tasks-visible.interactor';

export class TodoistGatewayResponse implements DataGatewayResponse {
    constructor(public isSuccessfull: boolean, public messages: string[] = []) {}
}

export class TodoistGateway implements DataGateway {
    private api: TodoistApi;

    constructor(configuredApi: TodoistApi) {
        this.api = configuredApi;
    }

    async saveState(tasks: Task[]): Promise<DataGatewayResponse> {
        return Promise.all(tasks.map((task: Task)  => {
                return this.api.updateTask(task.id, { labels: ['next'] });
            })).then((_:  object[]) => {
                return new TodoistGatewayResponse(true);
            }).catch(error => {
                return new TodoistGatewayResponse(false);
            });
    }
}
