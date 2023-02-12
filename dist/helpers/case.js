"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(value, options) {
    if (value === this.switchValue.value) {
        this.switchValue.found = true;
        return options.fn(this);
    }
}
exports.default = default_1;
;
//# sourceMappingURL=case.js.map