"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_hbs_1 = __importDefault(require("express-hbs"));
function default_1(partialName, options) {
    if (!partialName) {
        console.error('No partial name given.');
        return '';
    }
    const partial = express_hbs_1.default.handlebars.partials[partialName];
    if (!partial) {
        console.error('Couldnt find the compiled partial: ' + partialName);
        return '';
    }
    return new express_hbs_1.default.SafeString(partial(options.hash));
}
exports.default = default_1;
//# sourceMappingURL=partial.js.map