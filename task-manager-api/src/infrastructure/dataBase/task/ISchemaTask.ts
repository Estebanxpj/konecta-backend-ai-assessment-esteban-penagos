import { Schema } from "mongoose";

export interface ISchemaTask {
  _id: Schema.Types.ObjectId;
  tittle: string;
  userId: string;
  description: string;
  completed: boolean;
}
