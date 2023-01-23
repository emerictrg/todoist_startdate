import {
   ActivateTasksFromArrayOfIds
} from '../../../../application/adapters/activate-tasks.controller.from-array-of-ids'
import { Task } from '../../../../domain/entities/task'


describe('Activate Tasks Controller From Json', () => {
    test('transform an array of id to a collection of tasks', () => {
        const idsReceived: string[] = ['0001', '0002'];
        const controller = new ActivateTasksFromArrayOfIds(idsReceived);
        const tasks: Task[] = controller.tasksToActivate;
        expect(tasks.length).toBe(2);
        expect(tasks[0].id).toBe('0001');
        expect(tasks[1].id).toBe('0002');
    });
});
