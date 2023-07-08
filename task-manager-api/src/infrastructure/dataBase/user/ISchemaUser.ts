import { Schema } from "mongoose";
export interface ISchemaUser {
  _id: Schema.Types.ObjectId;
  userName: string;
  password: string;
}
