import { Schema, model } from "mongoose";
import { ISchemaUser } from "./ISchemaUser";

export const UserSchema: Schema = new Schema(
  {
    _id: { type: Schema.Types.ObjectId },
    userName: { type: String },
    password: { type: String },
  },
  {versionKey: false },
);
export default model<ISchemaUser>("users", UserSchema);
