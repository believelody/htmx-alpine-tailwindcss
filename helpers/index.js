import toString from './toString';
import partial from './partial';
import switchHelper from './switch';
import letHelper from './let';
import routes from './routes';
import caseHelper from './case';
import defaultHelper from './default';
import withDefault from './withDefault';
import cond from './cond';
import typeofHelper from './typeof';
import objectHelper from './object';
import arrayFrom from './arrayFrom';
import numberIntoString from './numberIntoString';
import chain from './chain';
import urlFromParams from './urlFromParams';
import spread from './spread';
import button from './button';
import uuid from './uuid';


export default {
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
    arrayFrom,
    numberIntoString,
    chain,
    urlFromParams,
    spread,
    button,
    uuid
};