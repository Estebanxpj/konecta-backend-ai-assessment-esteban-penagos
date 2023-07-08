import { CredentialsDto } from "../../../application/modules/security/dtos/CredentialsDto";
import UserModel from "../../../infrastructure/dataBase/user/User.model";
import { IUser } from "../../../application/modules/user/contracts/IUser";
import Cipher from "../../../application/shared/utils/Cipher";
import { User } from "../../../domain/user/User";
import UserMapping from "./UserMapping";
import { Types } from "mongoose";

export class UserRepository implements IUser {
  async authenticate(credentials: CredentialsDto): Promise<User> {
    const encryptPassword = this.CypherPassword(credentials.password);
    const result = await UserModel.findOne({
      userName: credentials.userName,
      password: encryptPassword,
    })
      .exec();
    return UserMapping.mapModelFromSchema(result?.toJSON());
  }
  async create(user: User): Promise<User> {
    const encryptPassword = this.CypherPassword(user.password);
    const result = await UserModel.create({
      _id: new Types.ObjectId(),
      userName: user?.userName,
      password: encryptPassword,
    });

    return UserMapping.mapModelFromSchema(result?.toJSON());
  }

  protected CypherPassword(password: string): string {
    return Cipher.cypher(password);
  }
}
