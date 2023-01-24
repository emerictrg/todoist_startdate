import { 
    TodoistTaskIdExtractor,
    TodoistEventData
} from '../../../infrastructure/todoist-task-id.extractor'

describe('Todoist Task Id extractor', () => {
    test('extract the id of the task from the event received', () => {
        const eventData: TodoistEventData = {
            item_id: '6514994421'
        };
        const taskId: string = TodoistTaskIdExtractor.extract(eventData);
        expect(taskId).toBe('6514994421');
    });
});
