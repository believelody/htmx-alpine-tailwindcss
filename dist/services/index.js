"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = __importDefault(require("./product"));
const post_1 = __importDefault(require("./post"));
const about_1 = __importDefault(require("./about"));
const team_1 = __importDefault(require("./team"));
const user_1 = __importDefault(require("./user"));
const auth_1 = __importDefault(require("./auth"));
const service = {
    product: product_1.default,
    post: post_1.default,
    about: about_1.default,
    team: team_1.default,
    user: user_1.default,
    auth: auth_1.default
};
exports.default = service;
//# sourceMappingURL=index.js.map