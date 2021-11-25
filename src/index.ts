/*!
 * ic-embed | https://github.com/intocities/ic-embed
 * Made by Into Cities | https://intocities.com
 * Released under the MIT License.
 */

// @ts-check

import ApiCredentials = require('./api_credentials')
import Embed = require('./embed')
import Preview = require('./preview')

// TODO: make use of apicredentials
export function embed(iframe: HTMLIFrameElement): Embed {
  return new Embed(iframe)
}

export function preview(container: HTMLElement,
  id: number,
  key: string,
  baseUrl = 'https://intocities.com',
  buttonText = 'Start Virtual Tour') {

  let preview = new Preview(container,
                            new ApiCredentials(id, key, baseUrl),
                            buttonText)
  preview.add()
}
