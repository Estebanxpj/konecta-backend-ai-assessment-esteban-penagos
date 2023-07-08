"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const crypto = require("crypto-ts");
class Cipher {
    static init(keySecret) {
        this.keySecret = keySecret;
    }
    static encrypt(password, keySecret) {
        return crypto.AES.encrypt(password, keySecret || this.keySecret).toString();
    }
    static decrypt(base64String, keySecret) {
        const bytes = crypto.AES.decrypt(base64String, keySecret || this.keySecret);
        return bytes.toString(crypto.enc.Utf8);
    }
    static cypher(password) {
        return (0, crypto_1.pbkdf2Sync)(password, this.keySecret, 1e1, 64, "sha512").toString("base64");
    }
}
exports.default = Cipher;
//# sourceMappingURL=Cipher.js.map