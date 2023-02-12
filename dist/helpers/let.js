"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1({ hash, fn }) {
    hash = Object.assign(Object.assign({}, hash), hash.spread);
    delete hash.spread;
    return fn(hash);
}
exports.default = default_1;
//# sourceMappingURL=let.js.map