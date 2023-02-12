"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_crypto_1 = __importDefault(require("node:crypto"));
function default_1() {
    return node_crypto_1.default.randomUUID();
}
exports.default = default_1;
//# sourceMappingURL=uuid.js.map