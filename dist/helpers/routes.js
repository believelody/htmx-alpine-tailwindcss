"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_json_1 = __importDefault(require("../routes/index.json"));
exports.default = ctx => {
    return index_json_1.default.routes;
};
//# sourceMappingURL=routes.js.map