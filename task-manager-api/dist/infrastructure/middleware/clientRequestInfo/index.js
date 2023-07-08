"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientRequestInfoMiddleware = void 0;
class ClientRequestInfoMiddleware {
    handler(req, res, next) {
        const clientIp = req.ip;
        const userAgent = req.headers["user-agent"];
        req.headers["clientInfo"] = JSON.stringify({ ip: clientIp, userAgent });
        return next();
    }
}
exports.ClientRequestInfoMiddleware = ClientRequestInfoMiddleware;
exports.default = new ClientRequestInfoMiddleware();
//# sourceMappingURL=index.js.map