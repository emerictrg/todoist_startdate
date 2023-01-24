export type TodoistEventData  =  {
    item_id: string
};

export class TodoistTaskIdExtractor {
    static extract(data: TodoistEventData) {
        return data.item_id;
    }
}
