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

interface PreviewParameters {
  id: number
  key: string
  baseUrl: string
  buttonText: string
}

export function preview(
  container: HTMLElement,
  { id, key, baseUrl = 'https://intocities.com', buttonText = 'Start Virtual Tour' }: PreviewParameters
): Promise<Preview> {
  const api = new ApiCredentials(id, key, baseUrl)

  return api.validate().then((valid) => {
    if (valid) {
      let preview = new Preview(container, api, buttonText)
      preview.add()
      return preview
    }
    throw new Error('validation failed')
  })
}
