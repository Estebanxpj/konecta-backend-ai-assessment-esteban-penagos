import { TokenDto } from "../dtos/TokenDto";
import { SessionDto } from "../dtos/SessionDto";

export interface IAuthorization {
    generate(session: SessionDto): TokenDto;
  }