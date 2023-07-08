import { SessionDto } from "./SessionDto";

export class SessionTokenDto {
    iat: number;
    exp: number;
    session: SessionDto;
  }