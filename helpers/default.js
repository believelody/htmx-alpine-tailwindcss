module.exports = function (options) {
    return !this.switchValue.found ? options.fn(this) : null;
}