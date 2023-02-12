"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_middleware_1 = __importDefault(require("./auth.middleware"));
const htmx_middleware_1 = __importDefault(require("./htmx.middleware"));
const http_middleware_1 = __importDefault(require("./http.middleware"));
const session_middleware_1 = __importDefault(require("./session.middleware"));
exports.default = {
    auth: auth_middleware_1.default,
    htmx: htmx_middleware_1.default,
    http: http_middleware_1.default,
    session: session_middleware_1.default
};
//# sourceMappingURL=index.js.map