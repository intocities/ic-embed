/*!
 * ic-embed | https://github.com/intocities/ic-embed
 * Made by Into Cities | https://intocities.com
 * Released under the MIT License.
 */

// @ts-check

import Embed = require('./embed')

export function embed(iframe: HTMLIFrameElement): Embed {
  return new Embed(iframe)
}
