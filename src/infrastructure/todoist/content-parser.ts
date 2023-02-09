export class TodoistContentParser {
  public static parse(content: string): string {
    const expression = /filter:\((.+)\)/;
    const matches: RegExpMatchArray | null = content.match(expression);
    if (matches !== null) {
      const [, group] = matches;
      if (group !== "") {
        return group;
      }
    }
    throw new Error(
      "Cannot get the filter from the content. Please check the content of the related tasks. [USAGE] filter:(todoist_filter)"
    );
  }
}
