import {
    ActivateTasksToString
} from '../../../../application/adapters/activate-tasks.presenter.to-string';
import { Task } from '../../../../domain/entities/task';

describe('Activate Tasks Prensenter to String', () => {
    test('transform a collection of tasks to  a collection of string', () => {
        const tasks = [new Task('0001'), new Task('0002')];
        const presenter = new ActivateTasksToString(tasks);
        const idsAsString: string[] = presenter.presentedTasks;
        expect(idsAsString.length).toBe(2);
        expect(idsAsString[0]).toBe('task 0001');
        expect(idsAsString[0]).toBe('task 0001');
    });
});
