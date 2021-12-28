import { ApiCredentials } from './api_credentials'
import { addStyles } from './styles'
import { urlWithTourOptions } from './utils'

interface Options {
  iframe: HTMLIFrameElement
  iframeOrigin: string
}

interface TourOptions {
  scene: string
  ath?: number
  atv?: number
  z?: number
}

interface Message {
  name: string
}

interface ChangeSceneMessage extends Message {
  sceneId: string
  ath?: number
  atv?: number
}

const EMBED_IFRAME_CLASS_NAME = 'ic-embed__iframe'

class Embed {
  options: Options
  apiCredentials: ApiCredentials
  tourOptions: TourOptions

  constructor(iframe: HTMLIFrameElement, apiCredentials: ApiCredentials, tourOptions?: TourOptions) {
    if (!iframe || !iframe?.contentWindow?.postMessage) {
      throw new TypeError('First parameter must be a HTMLIFrameElement!')
    }

    if (!apiCredentials) {
      throw new TypeError('Second parameter must be an ApiCredentials!')
    }

    this.apiCredentials = apiCredentials

    const options: Options = {
      iframe,
      iframeOrigin: iframe.src.split('/').slice(0, 3).join('/')
    }

    this.options = options

    if (tourOptions) {
      this.tourOptions = tourOptions
    }

    addStyles()

    window.addEventListener(
      'message',
      (event) => {
        this.receiveMessage(event)
      },
      false
    )
  }

  static initInContainer(container: HTMLElement, apiCredentials: ApiCredentials, tourOptions?: TourOptions): Embed {
    const iframe = document.createElement('iframe')
    iframe.id = `ic-tour-${apiCredentials.id}`
    iframe.allowFullscreen = true
    iframe.allow = 'fullscreen'
    iframe.className = EMBED_IFRAME_CLASS_NAME

    container.innerHTML = ''
    container.appendChild(iframe)

    return new Embed(iframe, apiCredentials, tourOptions)
  }

  mount(): HTMLIFrameElement {
    this.options.iframe.className = EMBED_IFRAME_CLASS_NAME
    this.options.iframe.src = urlWithTourOptions(this.apiCredentials.iframeUrl, this.tourOptions)
    return this.options.iframe
  }

  private assertAllowedOrigin(origin: string): void {
    if (origin !== this.options.iframeOrigin) {
      throw new Error('Discarding incoming message; untrusted event origin.')
    }
  }

  private dispatchEvent(name: string, data: object): void {
    console.log('dispatchEvent', name, data)

    this.options.iframe.dispatchEvent(new window.CustomEvent(name, { detail: data }))
  }

  private receiveMessage(event: MessageEvent): void {
    console.log('receiveMessage', event)

    this.assertAllowedOrigin(event.origin)
    this.dispatchEvent(event.data.name, event.data)
  }

  private postMessage(data: Message): void {
    console.log('postMessage', data, this.options.iframeOrigin)

    this.options.iframe.contentWindow!.postMessage(data, this.options.iframeOrigin)
  }

  params(): object {
    const parts = this.options.iframe.src.split('#')
    if (parts.length === 1) {
      return {}
    }

    const hash = parts[1]
    const pairs = hash.split('&')
    const returnObj: { [index: string]: string } = {}

    for (let i = 0; i < pairs.length; i++) {
      const pair = pairs[i].split('=')
      const key = decodeURIComponent(pair[0])
      const value = decodeURIComponent(pair[1])
      returnObj[key] = value
    }

    return returnObj
  }

  changeScene(sceneId: string, ath?: number | string, atv?: number | string): ChangeSceneMessage {
    if (!sceneId) {
      throw new TypeError('sceneId is required!')
    }

    const message: ChangeSceneMessage = { name: 'changeScene', sceneId }

    if (ath != undefined) {
      if (typeof ath === 'string') {
        message.ath = parseFloat(ath)
      } else if (typeof ath === 'number') {
        message.ath = ath
      } else {
        throw new TypeError('ath must be number or string')
      }
    }

    if (atv != undefined) {
      if (typeof atv === 'string') {
        message.atv = parseFloat(atv)
      } else if (typeof atv === 'number') {
        message.atv = atv
      } else {
        throw new TypeError('atv must be number or string')
      }
    }

    this.postMessage(message)

    return message
  }
}

export { Embed, TourOptions }
