/**
 * getValue as number if posible, if not returns value as is
 * @param {String} value to be converted to number
 */
function getValue(value) {
    const converted = Number(value);
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
    if (!params) return {}

    return params.split('&').reduce((acc, curr) => {
        const [key, value] = curr.split('=');
        return Object.assign(acc, { [key]: getValue(value) })
    }, {});
}

/**
 * Components to key:value object using format definition
 *  @param {Array} f to be used as url format
 *  @param {Array} i to be converted to key:value object using format
**/
function parseComponents(f, i) {
    const format = f.split('/').filter(i => i);
    const instance = i.split('/').filter(i => i);

    return format.reduce(({ acc, instance }, value, index) => {
        if (value.match(':[^:]')) {
            const key = value.substr(value.indexOf(":") + 1);
            acc[key] = getValue(instance[index]);
        }
        return { acc, instance };
    }, { acc: {}, instance }).acc;
}

/** 
 * components: array with url components
 * params: object with query params in key value format if present
**/
function parseUrlParams(url) {
    const [components, params] = url.split('?');
    return {
        components: urlToComponents(components),
        params: params ? parseParams(params) : {}
    }
}


/** 
 *  
 *  @param {String} urlFormat A urlformatstring, which describes the format of a url. 
 *  A url format stringcan contain constant parts and variable parts, in any order, where "parts" of a url are separated with "/". 
 *  All variable parts begin with a colon
 *  @param {String} urlInstance A particular url instance that is guaranteedto have the format given by the url formatstring. It may also contain url parameters
**/
export function urlParse(urlFormat, urlInstance) {
    const [components, params] = urlInstance.split('?');

    return Object.assign({},
        parseParams(params),
        parseComponents(urlFormat, components)
    );
}

/**
 * Alternative approach using class
 */
export class UrlParser {

    constructor(urlFormat) {
        this.setParseFormat(urlFormat);
    }

    setParseFormat(urlFormat) {
        this.urlFormat = urlFormat
    }

    parse(urlInstance) {
        const [components, params] = urlInstance.split('?');

        return Object.assign({},
            parseParams(params),
            parseComponents(this.urlFormat, components)
        );
    }
}