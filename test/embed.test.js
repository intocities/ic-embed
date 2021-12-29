const { Embed } = require('../lib/embed')
const { ApiCredentials } = require('../lib/api_credentials')

let credentials

beforeAll(async () => {
  credentials = new ApiCredentials(42, 'something', 'https://localhost')

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

test('Embed', () => {
  expect(Embed).toHaveProperty('initInContainer')
})

describe('Embed.initInContainer', () => {
  it('adds the attributes', () => {
    const embed = Embed.initInContainer(document.querySelector('div'), credentials)
    embed.mount()

    const iframe = document.querySelector('iframe')
    expect(iframe).toBeInstanceOf(HTMLIFrameElement)
    expect(iframe.className).toBe('ic-embed__iframe')
    expect(iframe.id).toContain('ic-tour-')
    expect(iframe.src).toEqual(credentials.iframeUrl)
    expect(iframe.allow).toBe('fullscreen')
  })
})

describe('.urlWithTourOptions', () => {
  it('adds just permitted attributes', () => {
    const url = Embed.urlWithTourOptions('http://example.com/resource', {
      scene: 'c1234/scene_sc3_Overlay_1',
      ath: 3,
      baz: '?'
    })
    expect(url).toBe('http://example.com/resource#scene=c1234%2Fscene_sc3_Overlay_1&ath=3')
  })

  it('adds no attributes', () => {
    const url = Embed.urlWithTourOptions('http://example.com/resource')
    expect(url).toBe('http://example.com/resource')
  })
})
