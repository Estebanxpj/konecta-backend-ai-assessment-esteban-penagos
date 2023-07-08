"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserUseCase = void 0;
const createUser_1 = require("../../../../application/modules/user/useCases/createUser");
const container_1 = require("../../shared/container");
const createUserUseCase = new createUser_1.CreateUserUseCase(container_1.userRepository);
exports.createUserUseCase = createUserUseCase;
//# sourceMappingURL=index.js.map