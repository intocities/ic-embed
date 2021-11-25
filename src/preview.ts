import ApiCredentials = require('./api_credentials')
import Embed = require('./embed')
import { addStyles } from './styles'
import Utils = require('./utils')

class Preview {
  container: HTMLElement
  buttonText: string
  apiCredentials: ApiCredentials
  block: HTMLElement

  constructor(container: HTMLElement, apiCredentials: ApiCredentials, buttonText: string) {
    this.container = container
    this.apiCredentials = apiCredentials
    this.buttonText = buttonText

    this.preload()

    this.container.addEventListener('click', () => {
      this.embed()
    })
  }

  mount(): void {
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
  }

  embed(): Embed {
    return Embed.init(this.block, this.apiCredentials)
  }

  private preload(): void {
    Utils.batchAddLinksToHead([
      { rel: 'preconnect', href: this.apiCredentials.baseUrl },
      { rel: 'dns-prefetch', href: this.apiCredentials.cdnUrl },
      { rel: 'preload', href: this.imageUrl, as: 'image' }
    ])
  }

  private get imageUrl(): string {
    return this.apiCredentials.apiResponse.poi.thumbnail_urls.landscape
  }
}

export = Preview
