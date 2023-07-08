import { LoginUserUseCase } from "../../../../application/modules/security/useCases/login";
import { AuthorizeUseCase } from "../../../../application/modules/security/useCases/authorize";
import Jwt from "../../../../infrastructure/security/jwt";
import { userRepository } from "../../shared/container";

const authorizeUseCase = new AuthorizeUseCase(Jwt);
const loginUseCase = new LoginUserUseCase(Jwt, userRepository)

export {
    authorizeUseCase,
    loginUseCase
}