const { Preview } = require('../lib/preview')
const { ApiCredentials } = require('../lib/api_credentials')
const { STYLE_ELEMENT_ID } = require('../lib/styles')

let credentials

beforeAll(async () => {
  credentials = new ApiCredentials(42, 'something', 'https://intocities.com')

  // @ts-ignore
  fetch.mockResponseOnce(
    JSON.stringify({
      poi: { id: 42, tour_present: true, thumbnail_urls: { landscape: 'dummy.png' } },
      origin: window.location.origin
    })
  )

  await credentials.validate()
})

beforeEach(() => {
  document.head.innerHTML = ''
  document.body.innerHTML = '<div></div>'
})

describe('new Preview', () => {
  test('new instance has property mount', () => {
    expect(new Preview(document.querySelector('div'), credentials)).toHaveProperty('mount')
  })
})

describe('the preview inside the DOM', () => {
  beforeEach(() => {
    const preview = new Preview(document.querySelector('div'), credentials)
    preview.mount()
  })

  it('creates the elements', () => {
    expect(document.head.querySelector(`style#${STYLE_ELEMENT_ID}`)).toBeInstanceOf(HTMLStyleElement)
    expect(document.head.querySelector('link[rel=preconnect]')).toBeInstanceOf(HTMLLinkElement)
    expect(document.head.querySelector('link[rel=preload]')).toBeInstanceOf(HTMLLinkElement)
    expect(document.head.querySelector('link[rel=dns-prefetch]')).toBeInstanceOf(HTMLLinkElement)

    expect(document.body.querySelector('.ic-preview')).toBeInstanceOf(HTMLDivElement)
    expect(document.body.querySelector('.ic-preview .ic-preview__wrapper')).toBeInstanceOf(HTMLDivElement)
    expect(document.body.querySelector('.ic-preview__wrapper .ic-preview__image')).toBeInstanceOf(HTMLImageElement)
    expect(document.body.querySelector('.ic-preview__wrapper .ic-preview__button')).toBeInstanceOf(HTMLButtonElement)
  })

  it('embeds the iframe on click', () => {
    const button = document.querySelector('.ic-preview__button')
    expect(button).toBeInstanceOf(HTMLButtonElement)

    button.dispatchEvent(
      new window.MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true
      })
    )

    expect(document.querySelector('.ic-preview > iframe')).toBeInstanceOf(HTMLIFrameElement)
  })
})

describe('preview#mountEmbed()', () => {
  it('returns an Embed instance', () => {
    document.body.innerHTML = '<div></div>'
    const preview = new Preview(document.querySelector('div'), credentials)
    preview.mount()

    const embed = preview.mountEmbed()

    expect(document.querySelector('iframe')).toBeInstanceOf(HTMLIFrameElement)
    expect(embed.tour).toHaveProperty('changeScene')
  })
})
