import { Context } from 'aws-lambda';

class TodoistEvent {
    constructor(public body: string)  {}
}

type genericEvent = {
    body: string
};

export const lambdaHandler = async (event: genericEvent) => {
    const todoistEvent = new TodoistEvent(event.body);
    console.log(event.body)
    console.log('le  compilateur est chelou');
    return {
        statusCode: 200,
        body:  JSON.stringify({
            message: "hello world"
        })
    };
}


