"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1({ hash }) {
    if (hash.spread) {
        hash = Object.assign(Object.assign({}, hash), hash.spread);
        delete hash.spread;
    }
    return hash;
}
exports.default = default_1;
;
//# sourceMappingURL=object.js.map