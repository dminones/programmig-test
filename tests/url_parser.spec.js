const chai = require('chai');
const { urlParse } = require('../build/url_parser');
const expect = chai.expect;

describe('Url parser exercise', () => {
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
    });

    it('without query params and only string variables', () => {
        const result = urlParse("/:version/api/:collection/", "/version/api/listings/");
        expect(result).to.deep.equal(
            {
                version: 'version',
                collection: "listings"
            });
    });

    it('only with query param variables and static format', () => {
        const result = urlParse("/api/listings", "/api/listings?sort=desc&limit=false");
        expect(result).to.deep.equal(
            {
                sort: 'desc',
                limit: "false"
            });
    });
});