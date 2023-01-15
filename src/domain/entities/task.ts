export interface ITask {
    id: string;
    isActivated: boolean;
}

export class Task implements ITask {
    private readonly _id: string;
    public isActivated: boolean;

    constructor(id: string) {
        this._id = id;
        this.isActivated = false;
    }

    get id()  {
        return this._id;
    }
}
