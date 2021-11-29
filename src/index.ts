/*!
 * ic-embed | https://github.com/intocities/ic-embed
 * Made by Into Cities | https://intocities.com
 * Released under the MIT License.
 */

// @ts-check

import ApiCredentials = require('./api_credentials')
import Embed = require('./embed')
import Preview = require('./preview')

interface EmbedParameters {
  id: number
  key: string
  baseUrl: string
}

export function embed(iframe: HTMLIFrameElement,
  { id, key, baseUrl }: EmbedParameters): Promise<Embed> {
  const api = new ApiCredentials(id, key, baseUrl)

  return api.validate().then((valid) => {
    if (valid) {
      const embed = new Embed(iframe, api)
      embed.mount()
      return embed
    }
    throw new Error('validation failed')
  })

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
      const preview = new Preview(container, api, buttonText)
      preview.mount()
      return preview
    }
    throw new Error('validation failed')
  })
}
