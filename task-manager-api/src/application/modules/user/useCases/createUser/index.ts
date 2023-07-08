import UserMap from "../../common/UserMap";
import { UserDto } from "../../dtos/UserDto";
import { IUser } from "../../contracts/IUser";
import {
  BaseUseCase,
  IResultT,
  ResultT,
  AuditActions,
  ClientAuditDto,
} from "../../../../shared/useCase/BaseUseCase";
import { User } from "../../../../../domain/user/User";

export type sssss =  User | null;

export class CreateUserUseCase extends BaseUseCase {
  constructor(public userRepository: IUser) {
    super();
  }

  public async execute(
    userDto: UserDto,
    clientAudit: ClientAuditDto
  ): Promise<IResultT<UserDto>> {
    const result = new ResultT<UserDto>();
    const audit = ClientAuditDto.mapToDomain(clientAudit, AuditActions.CreateUser);
    try {
      if (
        !this.validator.isValidEntry(result, {
          Password: userDto?.password,
          UserName: userDto?.userName,
        })
      )
        return result;

      const user = await this.userRepository.create(
        UserMap.mapToDomain(userDto)
      );
      if (!user) {
        result.setError(
          this.resources.get(this.resourceKeys.ERROR_SAVING_USER),
          this.applicationStatus.INTERNAL_SERVER_ERROR
        );
        return result;
      }

      result.setData(
        { id: user?.id } as UserDto,
        this.applicationStatus.SUCCESS,
        this.resources.get(this.resourceKeys.SUCCESSFUL_PROCESS),
      );

      audit.setSuccess();
      result.setMetadata(audit);
    } catch (error) {
      result.setMetadata(audit);
      this.handleError(error, result);
    }

    return result;
  }
}
