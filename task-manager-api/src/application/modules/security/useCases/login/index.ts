import { IAuthorization } from "../../contracts/IAuthorization";
import { SessionUserDto } from "../../dtos/SessionUserDto";
import { CredentialsDto } from "../../dtos/CredentialsDto";
import { User } from "../../../../../domain/user/User";
import { IUser } from "../../../user/contracts/IUser";
import { SessionDto } from "../../dtos/SessionDto";
import {
  BaseUseCase,
  AuditActions,
  ClientAuditDto,
  IResultT,
  ResultT,
  IResult,
} from "../../../../shared/useCase/BaseUseCase";
import { TokenDto } from "../../dtos/TokenDto";

export class LoginUserUseCase extends BaseUseCase {
  constructor(
    private readonly authorize: IAuthorization,
    private readonly userRepository: IUser
  ) {
    super();
  }

  async execute(
    credentialsDto: CredentialsDto,
    session: SessionDto,
    clientAudit: ClientAuditDto
  ): Promise<IResultT<TokenDto>> {
    const result = new ResultT<TokenDto>();

    const audit = ClientAuditDto.mapToDomain(clientAudit, AuditActions.Auth);

    try {
      if (!this.validateRequest(result, credentialsDto, session)) return result;

      const user: User = await this.authenticate(credentialsDto);

      if (!user) {
        result.setError(
          this.resources.get(this.resourceKeys.ERROR_LOGIN_USER),
          this.applicationStatus.UNAUTHORIZED
        );
        return result;
      }

      const token: TokenDto = this.authorize.generate(
        new SessionUserDto(user.id, user.userName, session.domain)
      );

      result.setData(
        token,
        this.applicationStatus.SUCCESS,
        this.resources.get(this.resourceKeys.ACCESS_GRANTED)
      );

      audit.setSuccess();
      result.setMetadata(audit);
    } catch (error) {
      result.setMetadata(audit);
      this.handleError(error, result);
    }

    return result;
  }

  private validateRequest(
    result: IResult,
    credentialsDto: CredentialsDto,
    session: SessionDto
  ): boolean {
    const isValid = this.validator.isValidEntry(result, {
      Password: credentialsDto?.password,
      UserName: credentialsDto?.userName,
      Session: session,
    });

    return isValid;
  }

  private async authenticate(credentialsDto: CredentialsDto): Promise<User> {
    const user = await this.userRepository.authenticate(credentialsDto);

    return user;
  }

  initAudit;
}
