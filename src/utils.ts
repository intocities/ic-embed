import { Embed, TourOptions } from './embed'

interface Link {
  href: string
  rel: string
  type?: string
  as?: string
}

export function batchAddLinksToHead(links: Link[]): void {
  links.forEach((link) => {
    addLinkToHead(link)
  })
}

export function addLinkToHead(attributes: Link): void {
  const link = document.createElement('link')
  link.href = attributes.href
  link.rel = attributes.rel

  if (attributes.type) {
    link.type = attributes.type
  }

  if (attributes.as) {
    link.as = attributes.as
  }

  document.head.appendChild(link)
}

const TOUR_OPTION_PERMITTED_KEYS = new Set(['scene', 'ath', 'atv', 'z'])

export function urlWithTourOptions(baseUrl: string, tourOptions?: TourOptions): string {
  if (!tourOptions) {
    return baseUrl
  }

  const options = Object.entries(tourOptions)
    .filter(([key, value]) => TOUR_OPTION_PERMITTED_KEYS.has(key))
    .map(([key, value]) => {
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    })

  return `${baseUrl}#${options.join('&')}`
}
