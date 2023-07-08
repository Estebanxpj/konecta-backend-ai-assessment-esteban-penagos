import AppSettings from "../../../../shared/settings/AppSettings";
import { IAuthorization } from "../../contracts/IAuthorization";
import Cipher from "../../../../shared/utils/Cipher";
import { SessionDto } from "../../dtos/SessionDto";
import {
  BaseUseCase,
  IResultT,
  ResultT,
} from "../../../../shared/useCase/BaseUseCase";
import { TokenDto } from "../../dtos/TokenDto";

export class AuthorizeUseCase extends BaseUseCase {
  constructor(private readonly authorize: IAuthorization) {
    super();
  }
  async execute(apiKey: string, domain: string): Promise<IResultT<TokenDto>> {
    const result = new ResultT<TokenDto>();
    if (
      !this.validator.isValidEntry(result, { domain: domain, apiKey: apiKey })
    ) {
      return result;
    }

    if (!this.isValidCredentials(apiKey, domain)) {
      result.setError(
        this.resources.get(this.resourceKeys.UNAUTHORIZED),
        this.applicationStatus.UNAUTHORIZED
      );
      return result;
    }

    const token = this.authorize.generate(new SessionDto(domain));
    if (!token) {
      result.setError(
        this.resources.get(this.resourceKeys.UNAUTHORIZED),
        this.applicationStatus.UNAUTHORIZED
      );
      return result;
    }

    result.setData(token, this.applicationStatus.SUCCESS);
    return result;
  }

  private isValidCredentials(apiKey: string, domain: string): boolean {
    const keyDecrypt = Cipher.decrypt(apiKey);
    return AppSettings.defaultApiKey === keyDecrypt && !!domain;
  }
}
