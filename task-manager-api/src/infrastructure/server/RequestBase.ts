import { SessionUserDto } from "../../application/modules/security/dtos/SessionUserDto";
import { SessionDto } from "../../application/modules/security/dtos/SessionDto";
import { Request } from "./CoreServer";

export interface RequestBase extends Request {
    session: SessionUserDto | SessionDto;
}