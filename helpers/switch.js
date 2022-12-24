module.exports = function (value, options) {
    this.switchValue = { value, found: false };
    return options.fn(this);
}