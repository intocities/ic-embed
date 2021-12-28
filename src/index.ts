/*!
 * ic-embed | https://github.com/intocities/ic-embed
 * Made by Into Cities | https://intocities.com
 */

// @ts-check

import { ApiCredentials, ApiParameters } from './api_credentials'
import { Embed, TourOptions } from './embed'
import { Preview, PreviewOptions } from './preview'

export function apiCredentials(id: number, key: string, baseUrl: string): ApiCredentials {
  return new ApiCredentials(id, key, baseUrl)
}

export function embed(
  iframe: HTMLIFrameElement,
  { id, key, baseUrl = 'https://intocities.com' }: ApiParameters,
  tourOptions?: TourOptions
): Promise<Embed> {
  const api = apiCredentials(id, key, baseUrl)

  return api
    .validate()
    .then(() => {
      const embed = new Embed(iframe, api, tourOptions)
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
  const api = apiCredentials(id, key, baseUrl)

  return api
    .validate()
    .then(() => {
      const preview = new Preview(container, api, tourOptions)
      preview.mount()
      return preview
    })
    .catch((error) => {
      throw error
    })
}
