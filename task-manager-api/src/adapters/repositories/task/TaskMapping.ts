import { ISchemaTask } from "../../../infrastructure/dataBase/task/ISchemaTask";
import { Task } from "../../../domain/task/Task";

export default class TaskMapping {
  public static mapModelFromSchema(model?: ISchemaTask): Task {
    if (!model) return null;

    const task = new Task(
      model.userId,
      model.tittle,
      model.description,
      model.completed
    );
    task.setId("1");

    return task;
  }
}
