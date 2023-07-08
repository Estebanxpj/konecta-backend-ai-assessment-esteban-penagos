"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegionMiddleware = void 0;
const errorMessages_1 = require("../../../application/shared/locals/errorMessages");
const ConfigResources_1 = require("../../server/ConfigResources");
class RegionMiddleware {
    handler(req, res, next) {
        const clientLanguages = req.headers["accept-language"];
        const acceptedLanguage = ConfigResources_1.default.region.appSupportedLanguages.find((language) => clientLanguages === null || clientLanguages === void 0 ? void 0 : clientLanguages.includes(language)) || ConfigResources_1.default.region.defaultLanguage;
        errorMessages_1.default.init(acceptedLanguage);
        return next();
    }
}
exports.RegionMiddleware = RegionMiddleware;
exports.default = new RegionMiddleware();
//# sourceMappingURL=index.js.map