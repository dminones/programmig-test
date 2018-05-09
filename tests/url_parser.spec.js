const chai = require('chai');
const { UrlParser } = require('../build/url_parser');
const { urlParse } = require('../build/parser_functions');
const expect = chai.expect;

describe('URL Parser Exercise', function () {

    describe('Using urlParse function', () => {
        it('complains the basic example', () => {
            const result = urlParse("/:version/api/:collection/:id", "/6/api/listings/3?sort=desc&limit=10");
            expect(result).to.deep.equal(
                {
                    version: 6,
                    collection: "listings", 
                    id: 3,
                    sort: "desc",
                    limit: 10
                });
        })

        it('without query params and only string variables', () => {
            const result = urlParse("/:version/api/:collection/", "/version/api/listings/");
            expect(result).to.deep.equal(
                {
                    version: 'version',
                    collection: "listings"
                });
        })

        it('only with query param variables and static format', () => {
            const result = urlParse("/api/listings", "/api/listings?sort=desc&limit=false");
            expect(result).to.deep.equal(
                {
                    sort: 'desc',
                    limit: "false"
                });
        })

    });

    describe('Using ParserUrl class', () => {
        it('complains the basic example', () => {
            const parser = new UrlParser("/:version/api/:collection/:id");
            const result = parser.parse("/6/api/listings/3?sort=desc&limit=10");
            expect(result).to.deep.equal(
                {
                    version: 6,
                    collection: "listings", 
                    id: 3,
                    sort: "desc",
                    limit: 10
                });
        });
    });
});