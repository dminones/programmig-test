'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.urlParse = urlParse;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * getValue as number if posible, if not returns value as is
 * @param {String} value to be converted to number
 */
function getValue(value) {
    var converted = Number(value);
    if (!Number.isNaN(converted)) {
        return converted;
    }

    return value;
}

/**
 * Query params string to key:value object
 * @param {String} params to be converted to key:value object
**/
function parseParams(params) {
    if (!params) return {};

    return params.split('&').reduce(function (acc, curr) {
        var _curr$split = curr.split('='),
            _curr$split2 = _slicedToArray(_curr$split, 2),
            key = _curr$split2[0],
            value = _curr$split2[1];

        return Object.assign(acc, _defineProperty({}, key, getValue(value)));
    }, {});
}

/**
 * Components to key:value object using format definition
 *  @param {Array} f to be used as url format
 *  @param {Array} i to be converted to key:value object using format
**/
function parseComponents(f, i) {
    var format = f.split('/').filter(function (i) {
        return i;
    });
    var instance = i.split('/').filter(function (i) {
        return i;
    });

    return format.reduce(function (_ref, value, index) {
        var acc = _ref.acc,
            instance = _ref.instance;

        if (value.match(':[^:]')) {
            var key = value.substr(value.indexOf(":") + 1);
            acc[key] = getValue(instance[index]);
        }
        return { acc: acc, instance: instance };
    }, { acc: {}, instance: instance }).acc;
}

/** 
 * components: array with url components
 * params: object with query params in key value format if present
**/
function parseUrlParams(url) {
    var _url$split = url.split('?'),
        _url$split2 = _slicedToArray(_url$split, 2),
        components = _url$split2[0],
        params = _url$split2[1];

    return {
        components: urlToComponents(components),
        params: params ? parseParams(params) : {}
    };
}

function urlParse(urlFormat, urlInstance) {
    var _urlInstance$split = urlInstance.split('?'),
        _urlInstance$split2 = _slicedToArray(_urlInstance$split, 2),
        components = _urlInstance$split2[0],
        params = _urlInstance$split2[1];

    return Object.assign({}, parseParams(params), parseComponents(urlFormat, components));
}

var UrlParser = exports.UrlParser = function () {
    function UrlParser(urlFormat) {
        _classCallCheck(this, UrlParser);

        this.setParseFormat(urlFormat);
    }

    _createClass(UrlParser, [{
        key: 'setParseFormat',
        value: function setParseFormat(urlFormat) {
            this.urlFormat = urlFormat;
        }
    }, {
        key: 'parse',
        value: function parse(urlInstance) {
            var _urlInstance$split3 = urlInstance.split('?'),
                _urlInstance$split4 = _slicedToArray(_urlInstance$split3, 2),
                components = _urlInstance$split4[0],
                params = _urlInstance$split4[1];

            return Object.assign({}, parseParams(params), parseComponents(this.urlFormat, components));
        }
    }]);

    return UrlParser;
}();