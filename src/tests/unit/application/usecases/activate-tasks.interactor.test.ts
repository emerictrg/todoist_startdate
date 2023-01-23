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
           tasksToActivate: [ new Task('dummy-task') ]
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
    test('is activating all the tasks', async () => {
        const inputPort: ActivateTasksInputPort = getMockedInputPort();
        const outputPort: ActivateTasksOutputPort = getMockedOutputPort();
        const gateway: ActivateTasksGateway = getMockedGateway();

        const interactor = new ActivateTasksInteractor(
            inputPort, outputPort, gateway
        );

        const outputPortWithTasks = await interactor.activateAllTasks();
        expect(outputPortWithTasks.tasks.length).toBe(1);
        outputPortWithTasks.tasks.forEach((task: Task) => {
            expect(task.isActivated).toBe(true);
        });
        expect(gateway.saveAllTasksActivationState).toHaveBeenCalled();
    });

    test('throw an error if the update is not successful', async () => {
        const inputPort: ActivateTasksInputPort = getMockedInputPort();
        const outputPort: ActivateTasksOutputPort = getMockedOutputPort();
        const gateway: ActivateTasksGateway = getMockedGateway(false);

        const interactor = new ActivateTasksInteractor(
            inputPort, outputPort, gateway
        );
        await expect(interactor.activateAllTasks()).rejects.toThrow();
    });
});

