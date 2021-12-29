import { Embed, TOUR_OPTIONS_PERMITTED_KEYS } from './embed'

interface Message {
  name: string
}

interface ChangeSceneMessage extends Message {
  sceneId: string
  ath?: number
  atv?: number
}

const AVAILABLE_EVENTS = new Set(['ic.sceneChanged', 'ic.ready'])

/**
 * Allows communication between your website and the embedded tour.
 *
 * @class TourProxy
 */
class TourProxy {
  private embed: Embed

  constructor(embed: Embed) {
    this.embed = embed

    window.addEventListener(
      'message',
      (event) => {
        this.receiveMessage(event)
      },
      false
    )
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

  params(): object {
    const parts = this.embed.iframe.src.split('#')
    if (parts.length === 1) {
      return {}
    }

    const hash = parts[1]
    const pairs = hash.split('&')
    const returnObj: { [index: string]: string } = {}

    for (let i = 0; i < pairs.length; i++) {
      const pair = pairs[i].split('=')
      const key = decodeURIComponent(pair[0])

      if (TOUR_OPTIONS_PERMITTED_KEYS.has(key)) {
        const value = decodeURIComponent(pair[1])
        returnObj[key] = value
      }
    }

    return returnObj
  }

  private assertAllowedOrigin(origin: string): void {
    if (origin !== this.embed.iframeOrigin) {
      throw new Error('Discarding incoming message; untrusted event origin.')
    }
  }

  /**
   * Dispatches an event to the iframe element, to consumed by the api user.
   *
   * @private
   * @param {string} name
   * @param {object} data
   * @memberof TourProxy
   */
  private dispatchEvent(name: string, data: object): void {
    console.debug('dispatchEvent', name, data)

    this.embed.iframe.dispatchEvent(new window.CustomEvent(name, { detail: data }))
  }

  /**
   * Receives messages from the iframe element.
   * It discards all events that are not in the AVAILABLE_EVENTS set.
   *
   * @private
   * @param {MessageEvent} event
   * @memberof TourProxy
   */
  private receiveMessage(event: MessageEvent): void {
    console.debug('receiveMessage', event)

    this.assertAllowedOrigin(event.origin)

    if (AVAILABLE_EVENTS.has(event.data.name)) {
      // We don't want to dispatch events that are not in AVAILABLE_EVENTS
      // because they are not meant to be dispatched.
      //
      // Also, we remove the "ic." prefix from the event name because it is
      // not needed in the event name.

      this.dispatchEvent(event.data.name.slice(3), event.data)
    } else {
      console.debug('Discarding incoming message; unknown event name.')
    }
  }

  /**
   * Posts a message to the iframe element, to be consumed by the virtual tour.
   *
   * @private
   * @param {Message} data
   * @memberof TourProxy
   */
  private postMessage(data: Message): void {
    console.debug('postMessage', data, this.embed.iframeOrigin)

    this.embed.iframe.contentWindow!.postMessage(data, this.embed.iframeOrigin)
  }
}

export { TourProxy, AVAILABLE_EVENTS }
