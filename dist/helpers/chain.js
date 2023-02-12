"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1() {
    const chains = [...Object.values(arguments).slice(0, -1)];
    if (chains.some(chain => chain && typeof chain !== "string")) {
        throw new Error('Arguments must be typed in string');
    }
    return chains.reduce((acc, cur) => acc += cur, "");
}
exports.default = default_1;
//# sourceMappingURL=chain.js.map