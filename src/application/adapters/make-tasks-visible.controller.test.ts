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

describe('make-tasks-visible Controller', () => {
    test('calls the usecase to make the tasks visible', async () => {
        const usecase = getMockedUseCase();
        const adapter = new controller.ItaskToTaskAdapter(usecase);

        const response: interactor.ResponseModel =
            await adapter.handle([{ id: '0001' }]);
        expect(usecase.changeVisibility).toBeCalled();
    });
});

