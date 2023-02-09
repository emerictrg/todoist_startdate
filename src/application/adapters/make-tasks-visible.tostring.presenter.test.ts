import * as interactor from "../usecases/make-tasks-visible.interactor";
import { TasksToString } from "./make-tasks-visible.tostring.presenter";
import { Task } from "../../domain/entities/task"


describe("make-tasks-visible tostring presenter", () => {
    test("take a collection of tasks and format them as a collection of string", () => {
        const response = new interactor.ResponseModel([ new Task('0001') ]);
        const presenter  = new TasksToString(response);
        const presentedTasks: string[] = presenter.toString();
        expect(presentedTasks).toHaveLength(1);
        expect(presentedTasks[0]).toBe('Task #0001');
    });
});
