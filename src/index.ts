/*!
 * ic-embed | https://github.com/intocities/ic-embed
 * Made by Into Cities | https://intocities.com
 */

// @ts-check

import { ApiCredentials, ApiParameters } from './api_credentials'
import { Embed, TourOptions } from './embed'
import { Preview, PreviewOptions } from './preview'

export function embed(
  iframe: HTMLIFrameElement,
  { id, key, baseUrl = 'https://intocities.com' }: ApiParameters,
  tourOptions?: TourOptions
): Promise<Embed> {
  const credentials = new ApiCredentials(id, key, baseUrl)

  return credentials
    .validate()
    .then(() => {
      const embed = new Embed(iframe, credentials, tourOptions)
      embed.mount()
      return embed
    })
    .catch((error) => {
      throw error
    })
}

export function preview(
  container: HTMLElement,
  { id, key, baseUrl = 'https://intocities.com' }: ApiParameters,
  tourOptions?: PreviewOptions
): Promise<Preview> {
  const credentials = new ApiCredentials(id, key, baseUrl)

  return credentials
    .validate()
    .then(() => {
      const preview = new Preview(container, credentials, tourOptions)
      preview.mount()
      return preview
    })
    .catch((error) => {
      throw error
    })
}
