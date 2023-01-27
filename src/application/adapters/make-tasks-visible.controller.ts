import * as interactor from '../usecases/make-tasks-visible.interactor';
import { Task, ITask } from '../../domain/entities/task'

export interface LambdaEvent {
    body: object;
}

export interface EventParser {
    parse(event: LambdaEvent): ITask[];
}

export class LambdaAdapter {
    constructor(
        public readonly usecase: interactor.DrivingPort,
        public readonly parser: EventParser
    ) {}

    async handle(event: LambdaEvent): Promise<interactor.ResponseModel> {
        const request = new interactor.RequestModel();
        request.tasksToActivate = this.transform(event);
        return await this.usecase.changeVisibility(request);
    }

    transform(event: LambdaEvent): Task[] {
        const tasksFromEvents: ITask[] = this.parser.parse(event);
        return tasksFromEvents.map(itask => {
            return new Task(itask.id);
        });
    }
}
