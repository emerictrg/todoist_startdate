import {
    ActivateTasksInteractor,
    ActivateTasksGateway,
    ActivateTasksGatewayResponse,
    ActivateTasksInputPort,
    ActivateTasksOutputPort
} from '../../../../application/usecases/activate-tasks.interactor'
import { ITask, Task } from '../../../../domain/entities/task'

const getMockedInputPort = (): ActivateTasksInputPort => {
        return  {
           tasks: [{ id: 'dummy-task', isActivated: false }],
           getTasksToActivate: () => {
                return [ new Task('dummy-task') ];
           }
        };
};

const getMockedOutputPort = (): ActivateTasksOutputPort => {
    return {
        tasks: []
    };
}

const getMockedGateway = 
    (isSuccessful: boolean = true): ActivateTasksGateway => {
        return {
            saveAllTasksActivationState: jest.fn((tasks: Task[]) => {
                const response: ActivateTasksGatewayResponse = {
                    isSuccessful: isSuccessful,
                    messages: []
                };
                return Promise.resolve(response);
            })
        }
}

describe('Activate Tasks Interactor', () => {
    const inputPort: ActivateTasksInputPort = getMockedInputPort();
    const outputPort: ActivateTasksOutputPort = getMockedOutputPort();
    const gateway: ActivateTasksGateway = getMockedGateway();

    const interactor = new ActivateTasksInteractor(
        inputPort, outputPort, gateway
    );

    test('is activating all the tasks', async () => {
        const outputPortWithTasks = await interactor.activateAllTasks();
        expect(outputPortWithTasks.tasks.length).toBe(1);
        outputPortWithTasks.tasks.forEach((task: Task) => {
            expect(task.isActivated).toBe(true);
        });
        expect(gateway.saveAllTasksActivationState).toHaveBeenCalled();
    });
});

