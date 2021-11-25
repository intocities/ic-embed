import ApiCredentials = require("./api_credentials")
import Embed = require("./embed")
import Utils = require("./utils")

const CONTAINER_STYLES = {
  position: 'relative',
  width: '100%',
  height: '100%',
  overflow: 'hidden',
}

const WRAPPER_STYLES = {
  position: 'absolute',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
}

const IMAGE_STYLES = {
  width: '100%',
  height: '100%',
  'object-fit': 'cover',
  'z-index': '1'
}

const START_TOUR_BUTTON_STYLES = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  'z-index': '2',
  'border-radius': '0.5em',
}

class Preview {
  container: HTMLElement;
  buttonText: string;
  apiCredentials: ApiCredentials

  constructor(container: HTMLElement, apiCredentials: ApiCredentials, buttonText: string) {
    this.container = container
    this.apiCredentials = apiCredentials
    this.buttonText = buttonText

    this.preload()

    this.container.addEventListener('click', (_event) => {
      Embed.init(this.container, this.apiCredentials, this.buttonText)
    })

    // TODO: when container comes into the view, add preload for tour
  }

  add(): void {
    Utils.assignStyles(this.container, CONTAINER_STYLES)

    const wrapper = document.createElement('div')
    Utils.assignStyles(wrapper, WRAPPER_STYLES)

    const img = document.createElement('img')
    img.loading = 'lazy'
    img.src = this.imageUrl
    Utils.assignStyles(img, IMAGE_STYLES)

    const button = document.createElement('button')
    button.innerText = this.buttonText
    Utils.assignStyles(button, START_TOUR_BUTTON_STYLES)

    wrapper.appendChild(button)
    wrapper.appendChild(img)

    this.container.appendChild(wrapper)
  }

  private preload(): void {
    Utils.batchAddLinksToHead([
      { rel: 'preconnect', href: this.apiCredentials.baseUrl },
      { rel: 'dns-prefetch', href: this.apiCredentials.cdnUrl },
      { rel: 'preload', href: this.imageUrl, as: 'image' }
    ])
  }

  private get imageUrl(): string {
    return `${this.apiCredentials.baseUrl}/images/${this.apiCredentials.id}/tour-preview.jpg`
  }
}

export = Preview
