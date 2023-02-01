import * as interactor from "../usecases/make-tasks-visible.interactor";
import * as controller from "./make-tasks-visible.controller";

const getMockedUseCase = (): interactor.DrivingPort => {
  return {
    changeVisibility: jest.fn((_: interactor.RequestModel) => {
      return Promise.resolve(new interactor.ResponseModel());
    }),
  };
};

describe("make-tasks-visible Controller", () => {
  test("calls the usecase to make the tasks visible", async () => {
    const usecase = getMockedUseCase();
    const adapter = new controller.ItaskToTaskAdapter(usecase);

    await adapter.handle([{ id: "0001" }]);
    expect(usecase.changeVisibility).toBeCalled();
  });
});
