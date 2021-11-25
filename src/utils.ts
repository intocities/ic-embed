
/**
 * Assigns CSS attributes (hyphen-style) to the element.
 *
 * @export
 * @param {HTMLElement} element
 * @param {{ [index: string]: string }} styles
 */
export function assignStyles(element: HTMLElement, styles: { [index: string]: string }): void {
  Object.keys(styles)
    .forEach((key: string) => {
      element.style.setProperty(key, styles[key]);
    })
}

export function batchAddLinksToHead(links: { href: string, rel: string, type?: string, as?: string }[]): void {
  links.forEach((link) => { addLinkToHead(link) })
}

export function addLinkToHead({ href, rel, type, as }: { href: string, rel: string, type?: string, as?: string }): void {
  const link = document.createElement('link')
  link.href = href
  link.rel = rel
  if (type) { link.type = type }
  if (as) { link.as = as }
  document.head.appendChild(link)
}
