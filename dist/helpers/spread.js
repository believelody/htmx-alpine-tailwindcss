"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(context) {
    const result = Object.entries(context).filter(([key, value]) => typeof value !== "object" && value).map(([key, value]) => {
        if (typeof value === "boolean" && value) {
            return `${key}`;
        }
        return `${key}='${value.toString()}'`;
    }).join(" ");
    return result;
}
exports.default = default_1;
//# sourceMappingURL=spread.js.map