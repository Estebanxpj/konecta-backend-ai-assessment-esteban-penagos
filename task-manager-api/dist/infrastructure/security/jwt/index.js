"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Jwt = void 0;
const TokenDto_1 = require("../../../application/modules/security/dtos/TokenDto");
const jsonwebtoken_1 = require("jsonwebtoken");
class Jwt {
    init(config) {
        this.secretKey = config.secretKey;
        this.expiresIn = config.expiresIn;
    }
    generate(session) {
        const jwtToken = (0, jsonwebtoken_1.sign)({ session: session }, this.secretKey, {
            expiresIn: this.expiresIn,
        });
        return new TokenDto_1.TokenDto(jwtToken);
    }
    verify(token) {
        return (0, jsonwebtoken_1.verify)(token, this.secretKey);
    }
}
exports.Jwt = Jwt;
exports.default = new Jwt();
//# sourceMappingURL=index.js.map