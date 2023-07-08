import { IAuthorization } from "../../../application/modules/security/contracts/IAuthorization";
import { SessionTokenDto } from "../../../application/modules/security/dtos/SessionTokenDto";
import { SessionDto } from "../../../application/modules/security/dtos/SessionDto";
import { TokenDto } from "../../../application/modules/security/dtos/TokenDto";
import { sign, verify } from "jsonwebtoken";

export class Jwt implements IAuthorization {
  private secretKey: string;
  private expiresIn: string;

  init(config: { secretKey: string; expiresIn: string }): void {
    this.secretKey = config.secretKey;
    this.expiresIn = config.expiresIn;
  }

  generate(session: SessionDto): TokenDto {
    const jwtToken = sign({ session: session }, this.secretKey, {
      expiresIn: this.expiresIn,
    });
    return new TokenDto(jwtToken);
  }

  verify(token: string): SessionTokenDto {
    return verify(token, this.secretKey) as SessionTokenDto;
  }
}

export default new Jwt();
