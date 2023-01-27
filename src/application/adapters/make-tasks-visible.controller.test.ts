import * as interactor from '../usecases/make-tasks-visible.interactor'
import * as controller from './make-tasks-visible.controller'
import { ITask } from '../../domain/entities/task'

const getMockedUseCase = (): interactor.DrivingPort => {
    return {
        changeVisibility: jest.fn((request: interactor.RequestModel) =>  {
            return Promise.resolve(new interactor.ResponseModel());
        })
    }
};

const getMockedParser = (): controller.EventParser => {
    return {
        parse: jest.fn((event: controller.LambdaEvent): ITask[] => {
            return [ 
                { id: '0001', isActivated: false }
            ];
        })
    }
}

describe('make-tasks-visible Controller', () => {
    test('calls the usecase to make the tasks visible', async () => {
        const usecase = getMockedUseCase();
        const parser = getMockedParser();
        const adapter: controller.LambdaAdapter =
            new controller.LambdaAdapter(usecase, parser);

        const event: controller.LambdaEvent = { body: { 'iteam_id': '0001' } };
        const response: interactor.ResponseModel =
            await adapter.handle(event);
        expect(usecase.changeVisibility).toBeCalled();
    });
});

