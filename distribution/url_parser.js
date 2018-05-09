"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.urlParse = urlParse;
function urlParse(urlFormat, urlInstance) {
    return urlInstance;
}

console.log(urlParse("/:version/api/:collecton/:id", "/6/api/listings/3?sort=desc&limit=10"));