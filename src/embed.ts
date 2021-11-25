import ApiCredentials = require('./api_credentials')
import { addStyles } from './styles'

interface Options {
  iframe: HTMLIFrameElement
  iframeOrigin: string
}

interface Message {
  name: string
}

interface ChangeSceneMessage extends Message {
  sceneId: string
  ath?: number
  atv?: number
}
class Embed {
  options: Options

  constructor(iframe: HTMLIFrameElement) {
    if (!iframe || !iframe?.contentWindow?.postMessage) {
      throw new TypeError('Parameter must be a HTMLIFrameElement!')
    }

    const options: Options = {
      iframe,
      iframeOrigin: iframe.src.split('/').slice(0, 3).join('/')
    }

    this.options = options

    console.log('ICEmbed initialized with options', this.options)

    addStyles()

    window.addEventListener(
      'message',
      (event) => {
        this.receiveMessage(event)
      },
      false
    )
  }

  static init(container: HTMLElement, apiCredentials: ApiCredentials): Embed {
    const iframe = document.createElement('iframe')
    iframe.id = `ic-tour-${apiCredentials.id}`
    iframe.src = apiCredentials.iframeUrl()
    iframe.allowFullscreen = true
    iframe.allow = 'fullscreen'
    iframe.className = 'ic-embed__iframe'

    container.replaceWith(iframe)

    const embed = new Embed(iframe)

    return embed
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

  changeScene(sceneId: string, ath?: number | string, atv?: number | string): void {
    if (typeof ath === 'string') {
      ath = parseFloat(ath)
    } else if (typeof ath !== 'number') {
      throw new TypeError('ath must be number or string')
    }

    if (typeof atv === 'string') {
      atv = parseFloat(atv)
    } else if (typeof atv !== 'number') {
      throw new TypeError('atv must be number or string')
    }

    const message: ChangeSceneMessage = {
      name: 'changeScene',
      sceneId,
      ath,
      atv
    }

    this.postMessage(message)
  }
}

export = Embed
