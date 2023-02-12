"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_hbs_1 = __importDefault(require("express-hbs"));
function default_1({ fn, hash }) {
    if (hash.spread) {
        hash = Object.assign(Object.assign({}, hash), hash.spread);
        delete hash.spread;
    }
    delete hash.title;
    delete hash.body;
    delete hash.class;
    const { size = 6, color = '', fill = "currentColor", stroke = "currentColor", strokeWidth = 2, viewBox } = hash;
    delete hash.size;
    delete hash.color;
    delete hash.fill;
    delete hash.stroke;
    delete hash["stroke-width"];
    delete hash.viewBox;
    const spreadAttrs = express_hbs_1.default.handlebars.helpers.spread.call(this, Object.assign({}, hash));
    return `<svg ${spreadAttrs} class="${color}" width="${size * 4}" height="${size * 4}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" viewBox="${viewBox}" xmlns="http://www.w3.org/2000/svg">${fn(hash)}</svg>`;
}
exports.default = default_1;
//# sourceMappingURL=svg.js.map