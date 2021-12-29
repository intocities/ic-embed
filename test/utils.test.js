const { batchAddLinksToHead } = require('../lib/utils')

beforeEach(() => {
  document.head.innerHTML = ''
  document.body.innerHTML = '<div></div>'
})

describe('.batchAddLinksToHead', () => {
  it('adds them to document.head', () => {
    batchAddLinksToHead([
      { rel: 'preconnect', href: 'https://example.com' },
      { rel: 'preconnect', href: 'https://example.org' }
    ])

    expect(document.querySelector('link[rel="preconnect"][href="https://example.com"]')).toBeInstanceOf(HTMLLinkElement)
    expect(document.querySelector('link[rel="preconnect"][href="https://example.org"]')).toBeInstanceOf(HTMLLinkElement)
  })
})
