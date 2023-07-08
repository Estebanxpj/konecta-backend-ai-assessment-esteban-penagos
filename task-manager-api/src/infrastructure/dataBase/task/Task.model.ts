import { Schema, model } from "mongoose";
import { ISchemaTask } from "./ISchemaTask";

export const TaskSchema: Schema = new Schema(
  {
    _id: { type: Schema.Types.ObjectId },
    tittle: { type: String },
    description: { type: String },
    userId: { type: String },
    completed: { type: Boolean, default: false },
  },
  { versionKey: false },
);

export default model<ISchemaTask>("tasks", TaskSchema);
