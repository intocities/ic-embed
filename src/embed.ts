import { ApiCredentials } from './api_credentials'
import { addStyles } from './styles'
import { TourProxy } from './tour_proxy'

interface Options {
  iframe: HTMLIFrameElement
}

interface TourOptions {
  scene: string
  ath?: number
  atv?: number
  z?: number
}

const IFRAME_CLASS_NAME = 'ic-embed__iframe'
export const TOUR_OPTIONS_PERMITTED_KEYS = new Set(['scene', 'ath', 'atv', 'z'])

class Embed {
  private options: Options
  private apiCredentials: ApiCredentials
  private tourOptions: TourOptions
  private tourProxy?: TourProxy

  constructor(iframe: HTMLIFrameElement, apiCredentials: ApiCredentials, tourOptions?: TourOptions) {
    if (!iframe || !iframe?.contentWindow?.postMessage) {
      throw new TypeError('First parameter must be a HTMLIFrameElement!')
    }

    if (!apiCredentials) {
      throw new TypeError('Second parameter must be an ApiCredentials!')
    }

    this.apiCredentials = apiCredentials

    const options: Options = {
      iframe
    }

    this.options = options

    if (tourOptions) {
      this.tourOptions = tourOptions
    }

    addStyles()
  }

  static initInContainer(container: HTMLElement, apiCredentials: ApiCredentials, tourOptions?: TourOptions): Embed {
    const iframe = document.createElement('iframe')
    iframe.id = `ic-tour-${apiCredentials.id}`
    iframe.allowFullscreen = true
    iframe.allow = 'fullscreen'
    iframe.className = IFRAME_CLASS_NAME

    container.innerHTML = ''
    container.appendChild(iframe)

    return new Embed(iframe, apiCredentials, tourOptions)
  }

  static urlWithTourOptions(baseUrl: string, tourOptions?: TourOptions): string {
    if (!tourOptions) {
      return baseUrl
    }

    const options = Object.entries(tourOptions)
      .filter(([key, value]) => TOUR_OPTIONS_PERMITTED_KEYS.has(key))
      .map(([key, value]) => {
        return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      })

    return `${baseUrl}#${options.join('&')}`
  }

  get iframe(): HTMLIFrameElement {
    return this.options.iframe
  }

  get iframeOrigin(): string {
    return this.options.iframe.src.split('/').slice(0, 3).join('/')
  }

  get tour(): TourProxy {
    if (!this.tourProxy) {
      this.tourProxy = new TourProxy(this)
    }

    return this.tourProxy
  }

  mount(): HTMLIFrameElement {
    this.options.iframe.className = IFRAME_CLASS_NAME
    this.options.iframe.src = Embed.urlWithTourOptions(this.apiCredentials.iframeUrl, this.tourOptions)
    return this.options.iframe
  }
}

export { Embed, TourOptions }
