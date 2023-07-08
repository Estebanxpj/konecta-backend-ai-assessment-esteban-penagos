"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUseCase = exports.authorizeUseCase = void 0;
const login_1 = require("../../../../application/modules/security/useCases/login");
const authorize_1 = require("../../../../application/modules/security/useCases/authorize");
const jwt_1 = require("../../../../infrastructure/security/jwt");
const container_1 = require("../../shared/container");
const authorizeUseCase = new authorize_1.AuthorizeUseCase(jwt_1.default);
exports.authorizeUseCase = authorizeUseCase;
const loginUseCase = new login_1.LoginUserUseCase(jwt_1.default, container_1.userRepository);
exports.loginUseCase = loginUseCase;
//# sourceMappingURL=index.js.map