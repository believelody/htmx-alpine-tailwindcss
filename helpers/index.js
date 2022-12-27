const toString = require('./toString');
const partial = require('./partial');
const switchHelper = require('./switch');
const letHelper = require('./let');
const routes = require('./routes');
const caseHelper = require('./case');
const defaultHelper = require('./default');
const withDefault = require('./withDefault');
const cond = require('./cond');
const typeofHelper = require('./typeof');
const objectHelper = require('./object');

module.exports.customHelpers = {
    toString,
    partial,
    switch: switchHelper,
    let: letHelper,
    routes,
    case: caseHelper,
    default: defaultHelper,
    withDefault,
    cond,
    typeof: typeofHelper,
    object: objectHelper,
};