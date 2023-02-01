import { TodoistContentParser } from "./content-parser";

describe("Toddoist Content Parser", () => {
  test("retrieve the filter from the task content", () => {
    const content = "pusher les tasks filter:(#a-project)";
    const filter: string = TodoistContentParser.parse(content);
    expect(filter).toBe("#a-project");
  });

  test("throw an exception if the filter is not found", () => {
    expect(() => {
      TodoistContentParser.parse("il faut activer les #aaaa");
    }).toThrow();
  });

  test("throw an exception if the filter is empty", () => {
    expect(() => {
      TodoistContentParser.parse("pusher les tasks filter:()");
    }).toThrow();
  });
});
