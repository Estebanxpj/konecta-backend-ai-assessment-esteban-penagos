import { SessionDto } from "./SessionDto";

export class SessionUserDto extends SessionDto {
  constructor(public userId: string, public userName: string, domain: string) {
    super(domain);
  }
}
