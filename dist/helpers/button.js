"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_hbs_1 = __importDefault(require("express-hbs"));
function default_1({ fn, hash }) {
    delete hash.spread.body;
    if (!hash.spread.class) {
        const className = ["relative px-4 py-2 rounded btn"];
        if (hash.spread.color) {
            if (hash.spread.outlined) {
                className.push(`btn-${hash.spread.color}-outlined`);
                delete hash.spread.outlined;
            }
            else {
                className.push(`btn-${hash.spread.color}`);
            }
            delete hash.spread.color;
        }
        else {
            if (hash.spread.outlined) {
                className.push("btn-outlined");
                delete hash.spread.outlined;
            }
        }
        ;
        if (hash.spread.block) {
            className.push("w-full");
        }
        hash.spread.class = className.join(" ");
    }
    const spreadAttrs = express_hbs_1.default.handlebars.helpers.spread.call(this, hash.spread);
    return "<button " + spreadAttrs + ">" + fn(hash.spread) + "</button>";
}
exports.default = default_1;
//# sourceMappingURL=button.js.map