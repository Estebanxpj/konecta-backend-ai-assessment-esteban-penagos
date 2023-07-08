import { TaskDto } from "./TaskDto";

export class TaskDetailDto extends TaskDto {
  constructor(
    public description,
    public completed: boolean,
    id: string,
    tittle: string
  ){
    super(id, tittle);
  }
}
