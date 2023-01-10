import { Context } from 'aws-lambda';

class TodoistEvent {
    constructor(public body: string)  {}

    get decodedBody(): string {
        return Buffer.from(this.body, 'base64').toString('utf-8');
    }
}

type genericEvent = {
    body: string
};

export const lambdaHandler = async (event: genericEvent) => {
    const todoistEvent = new TodoistEvent(event.body);
    console.log(todoistEvent.decodedBody);
    return {
        statusCode: 200,
        body:  JSON.stringify({
            message: "hello world"
        })
    };
}


