import * as interactor from "./make-tasks-visible.interactor";
import { Task } from "../../domain/entities/task";

const getMockedGateway = (isSuccessfull = true): interactor.DataGateway => {
  return {
    saveState: jest.fn((_: Task[]) => {
      const response: interactor.DataGatewayResponse = {
        isSuccessfull: isSuccessfull,
        messages: [],
      };
      return Promise.resolve(response);
    }),
  };
};

describe("Activate Tasks Interactor", () => {
  test("is activating all the tasks", async () => {
    const gateway: interactor.DataGateway = getMockedGateway();
    const usecase = new interactor.MakeTasksVisible(gateway);

    const request = new interactor.RequestModel([new Task("0001")]);
    const response: interactor.ResponseModel = await usecase.changeVisibility(
      request
    );

    expect(response.activatedTasks.length).toBe(1);
    response.activatedTasks.forEach((task: Task) => {
      expect(task.isActivated).toBe(true);
    });
    expect(gateway.saveState).toHaveBeenCalled();
  });

  test("throw an error if the update is not successful", async () => {
    const gateway: interactor.DataGateway = getMockedGateway(false);
    const usecase = new interactor.MakeTasksVisible(gateway);
    const request = new interactor.RequestModel();
    await expect(usecase.changeVisibility(request)).rejects.toThrow();
  });
});
