import { CreateUserUseCase } from "../../../../application/modules/user/useCases/createUser";
import { userRepository } from "../../shared/container";

const createUserUseCase = new CreateUserUseCase(userRepository);

export { createUserUseCase };
