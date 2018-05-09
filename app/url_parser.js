import { parseParams, parseComponents } from './parser_functions'

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