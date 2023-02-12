"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const env_util_1 = __importDefault(require("./env.util"));
const retrieveAppropriateBackUrl = (backURL, backupURL) => {
    if (!backURL) {
        return backupURL;
    }
    const backURLObject = new URL(backURL);
    return backURLObject.pathname.startsWith(`${backupURL}?`) ? `${backURLObject.pathname}${backURLObject.search}` : backupURL;
};
const baseUrl = `http://localhost:${env_util_1.default.port}`;
exports.default = { retrieveAppropriateBackUrl, baseUrl };
//# sourceMappingURL=url.util.js.map