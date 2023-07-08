import { ITask } from "../../../application/modules/task/contracts/ITask";
import TaskModel from "../../../infrastructure/dataBase/task/Task.model";
import { Task } from "../../../domain/task/Task";
import TaskMapping from "./TaskMapping";
import { Types } from "mongoose";
import { TaskDetailDto } from "../../../application/modules/task/dtos/TaskDetailDto";

export class TaskRepository implements ITask {
  async create(task: Task): Promise<Task> {
    const result = await TaskModel.create({
      _id: new Types.ObjectId(),
      userId: task.userId,
      tittle: task.tittle,
      description: task.description,
      completed: task.completed,
    });

    return TaskMapping.mapModelFromSchema(result?.toJSON());
  }

  async getByUserId(userId: string): Promise<Task[]> {
    const result = await TaskModel.find({ userId: userId }).exec();
    if (!result) {
      return null;
    }

    return result.map((task) => TaskMapping.mapModelFromSchema(task));
  }

  async getById(id: string): Promise<Task> {
    const result = await TaskModel.findOne({ _id: id }).exec();

    return TaskMapping.mapModelFromSchema(result?.toJSON());
  }
  async update(task: TaskDetailDto): Promise<Task> {
    const model = await TaskModel.findOne({ _id: task.id }).exec();

    model.tittle = task.tittle || model.tittle;
    model.description = task.description || model.description;
    model.completed = task.completed || model.completed;

    model.save();

    return TaskMapping.mapModelFromSchema(model?.toJSON());
  }
  async delete(id: string): Promise<boolean> {
    const result = await TaskModel.deleteOne({ _id: id });

    return result?.deletedCount > 0 ? true : false;
  }
}
