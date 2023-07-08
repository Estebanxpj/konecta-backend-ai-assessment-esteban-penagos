import { ISchemaUser } from "../../../infrastructure/dataBase/user/ISchemaUser";
import { User } from "../../../domain/user/User";

export default class UserMapping {
    public static mapModelFromSchema(model?: ISchemaUser): User
    {
        if (!model) return null;

        const user = new User(model.userName, model.password)
        user.setId(model._id.toString());

        return user;
    }
}