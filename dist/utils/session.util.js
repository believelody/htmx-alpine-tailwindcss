"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sessionMaxAge30Days = 30 * 24 * 60 * 60 * 1000;
const sessionExpiresIn30Days = Date.now() + sessionMaxAge30Days;
exports.default = { sessionExpiresIn30Days, sessionMaxAge30Days };
//# sourceMappingURL=session.util.js.map