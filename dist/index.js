"use strict";
/*!
 * ic-embed | https://github.com/intocities/ic-embed
 * Made by Into Cities | https://intocities.com
 * Released under the MIT License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.embed = void 0;
var Embed = require("./embed");
function embed(iframe) {
    return new Embed(iframe);
}
exports.embed = embed;
