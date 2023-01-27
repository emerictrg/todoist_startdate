 export default class Config {
    public static getTodoistAccessToken(): string {
        const token = process.env.TODOIST_ACCESS_TOKEN;
        if (token === undefined) {
            throw new Error('todoist  access token is not set.');
        }
        return token;
    }
 }
