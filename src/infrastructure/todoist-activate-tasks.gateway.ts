import { TodoistApi, Task as TodoistTask } from '@doist/todoist-api-typescript';
import { Task } from '../domain/entities/task';
import { 
    DataGateway,
    DataGatewayResponse
} from '../application/usecases/make-tasks-visible.interactor';

class TodoistGateway implements DataGateway {
    private api: TodoistApi;

    constructor(configuredApi: TodoistApi) {
        this.api = configuredApi;
    }

    async saveState(tasks: Task[]): Promise<DataGatewayResponse> {
        return Promise.all(tasks.map((task: Task)  => {
                return this.api.updateTask(task.id, { labels: ['next'] });
            })).then((_:  object[]) => {
                return {
                    isSuccessfull: true,
                    messages: []
                }
            }).catch(error => {
                return  {
                    isSuccessfull: false,
                    messages: []
                }
            });
    }
}
