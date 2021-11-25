/**
 * Assigns CSS attributes (hyphen-style) to the element.
 *
 * @export
 * @param {HTMLElement} element
 * @param {{ [index: string]: string }} styles
 */
export function assignStyles(element: HTMLElement, styles: { [index: string]: string }): void {
  Object.keys(styles).forEach((key: string) => {
    element.style.setProperty(key, styles[key])
  })
}

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
