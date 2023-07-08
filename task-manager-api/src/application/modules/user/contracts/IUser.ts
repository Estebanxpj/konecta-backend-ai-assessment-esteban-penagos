import { User } from "../../../../domain/user/User";
import { CredentialsDto } from "../../security/dtos/CredentialsDto";

export interface IUser {
    authenticate(credentialsDto: CredentialsDto): Promise<User | null>;
    create(user: User): Promise<User | null>;

}