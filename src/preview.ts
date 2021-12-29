import { ApiCredentials, ApiParameters } from './api_credentials'
import { Embed, TourOptions } from './embed'
import { addStyles } from './styles'
import { batchAddLinksToHead } from './utils'

interface PreviewOptions extends TourOptions {
  buttonText: string
}

class Preview {
  embed: Embed

  private container: HTMLElement
  private buttonText: string
  private apiCredentials: ApiCredentials
  private block: HTMLElement

  constructor(container: HTMLElement, apiCredentials: ApiCredentials, options?: PreviewOptions) {
    if (!container || !apiCredentials) {
      throw new TypeError('Parameters must be a HTMLElement and ApiCredentials!')
    }

    this.container = container
    this.apiCredentials = apiCredentials
    this.buttonText = options?.buttonText || 'Starte Rundgang'

    this.preload()

    this.container.addEventListener('click', () => {
      this.mountEmbed(options)
    })
  }

  /**
   *
   *
   * @return {*} the container {HTMLElement}
   * @memberof Preview
   */
  mount(): HTMLElement {
    addStyles()

    this.block = document.createElement('div')
    this.block.className = 'ic-preview'

    const wrapper = document.createElement('div')
    wrapper.className = 'ic-preview__wrapper'

    const img = document.createElement('img')
    img.className = 'ic-preview__image'
    img.loading = 'lazy'
    img.src = this.imageUrl

    const button = document.createElement('button')
    button.className = 'ic-preview__button'
    button.innerText = this.buttonText

    wrapper.appendChild(button)
    wrapper.appendChild(img)
    this.block.appendChild(wrapper)
    this.container.appendChild(this.block)

    return this.container
  }

  /**
   * Embeds the virtual tour
   *
   * @return {*}  {Embed}
   * @memberof Preview
   */
  mountEmbed(tourOptions?: TourOptions): Embed {
    if (this.embed) {
      return this.embed
    }

    this.embed = Embed.initInContainer(this.block, this.apiCredentials, tourOptions)
    this.embed.mount()
    return this.embed
  }

  private preload(): void {
    batchAddLinksToHead([
      { rel: 'preconnect', href: this.apiCredentials.baseUrl },
      { rel: 'dns-prefetch', href: ApiCredentials.cdnUrl },
      { rel: 'preload', href: this.imageUrl, as: 'image' }
    ])
  }

  private get imageUrl(): string {
    return this.apiCredentials.apiResponse.poi.thumbnail_urls.landscape
  }
}

export { Preview, PreviewOptions }
