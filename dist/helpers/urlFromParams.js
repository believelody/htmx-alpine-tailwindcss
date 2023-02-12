"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(baseUrl, { hash }) {
    const url = new URL(baseUrl);
    Object.entries(hash).forEach(([key, value]) => {
        if (url.searchParams.has(key)) {
            url.searchParams.delete(key);
        }
        url.searchParams.append(key, value);
    });
    return url;
}
exports.default = default_1;
//# sourceMappingURL=urlFromParams.js.map