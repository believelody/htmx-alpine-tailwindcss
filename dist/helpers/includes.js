"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1() {
    const chars = [...Object.values(arguments).slice(0, -1)];
    if (chars.some(char => !char)) {
        return false;
    }
    if (chars.some(char => typeof char !== "string" && typeof char !== "number")) {
        throw new Error("Arguments must be string or number");
    }
    return chars[0].includes(chars[1]);
}
exports.default = default_1;
//# sourceMappingURL=includes.js.map