import { ApiCredentials } from './api_credentials'
import { Embed, TourOptions } from './embed'
import { addStyles } from './styles'
import { batchAddLinksToHead, encodedPanoIcon } from './utils'

interface PreviewOptions extends TourOptions {
  buttonText: string
  showIcon: boolean
}

class Preview {
  embed: Embed

  private container: HTMLElement
  private apiCredentials: ApiCredentials
  private block: HTMLElement
  private options: PreviewOptions
  private DEFAULT_OPTIONS: PreviewOptions = {
    buttonText: 'Starte Rundgang',
    showIcon: true,
    scene: ''
  }

  constructor(container: HTMLElement, apiCredentials: ApiCredentials, options?: PreviewOptions) {
    if (!container || !apiCredentials) {
      throw new TypeError('Parameters must be a HTMLElement and ApiCredentials!')
    }

    this.container = container
    this.apiCredentials = apiCredentials
    this.options = Object.assign({}, this.DEFAULT_OPTIONS, options)

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
    img.className = 'ic-preview__image--loading'
    img.alt = ''

    if (this.apiCredentials.imageUrl) {
      img.className = 'ic-preview__image'
      img.loading = 'lazy'
      img.src = this.apiCredentials.imageUrl
    }

    if (this.options.showIcon) {
      const panoIcon = document.createElement('img')
      panoIcon.className = 'ic-preview__image--pano'
      panoIcon.alt = '360° icon'
      panoIcon.setAttribute('role', 'presentation')
      panoIcon.src = encodedPanoIcon()
      wrapper.appendChild(panoIcon)
    }

    if (this.options.buttonText && this.options.buttonText !== '') {
      const button = document.createElement('ic-button', { is: 'button' })
      button.innerText = this.options.buttonText
      wrapper.appendChild(button)
    }

    this.block.appendChild(img)
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
      { rel: 'prerender', href: this.apiCredentials.iframeUrl },
      // Keeping a prefetch here for browsers which do not support prerender:
      // https://caniuse.com/link-rel-prerender
      { rel: 'prefetch', href: this.apiCredentials.iframeUrl }
    ])
  }
}

export { Preview, PreviewOptions }
