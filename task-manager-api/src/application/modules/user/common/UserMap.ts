import { User } from "../../../../domain/user/User";
import { UserDto } from "../dtos/UserDto";

export default class UserMap {

    public static mapToDomain(userDto: UserDto): User {
        return new User(userDto.userName, userDto.password)
    }
}