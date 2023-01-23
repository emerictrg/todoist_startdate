import { ITask, Task } from '../../domain/entities/task';

export interface ActivateTasksInputPort {
    tasksToActivate: Task[];
}

export interface ActivateTasksOutputPort {
    tasks: Task[];
}

export interface ActivateTasksGatewayResponse {
    isSuccessful: boolean;
    messages: string[]
}

export interface ActivateTasksGateway {
    saveAllTasksActivationState(tasks: Task[]): Promise<ActivateTasksGatewayResponse>;
}

export class ActivateTasksInteractor {
    constructor(
        public inputPort: ActivateTasksInputPort,
        public outputPort: ActivateTasksOutputPort,
        public gateway: ActivateTasksGateway
    ) {}

    public async activateAllTasks(): Promise<ActivateTasksOutputPort> {
        const tasksToActivate: Task[] = this.inputPort.tasksToActivate;
        this.outputPort.tasks = tasksToActivate.map(task => { 
            task.isActivated = true; 
            return task;
        });
        const response = await this.gateway.saveAllTasksActivationState(tasksToActivate);
        if (!response.isSuccessful) {
            throw new Error('tasks was not activated properly on save');
        }
       return Promise.resolve(this.outputPort);
    }
}

