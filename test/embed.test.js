const Embed = require('../lib/embed')
const ApiCredentials = require('../lib/api_credentials')

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
    expect(iframe.className).toBe('ic-embed__iframe')
    expect(iframe.id).toContain('ic-tour-')
    expect(iframe.src).toEqual(credentials.iframeUrl)
    expect(iframe.allow).toBe('fullscreen')
  })
})

describe('#params', () => {
  it('returns an object', () => {
    const embed = Embed.initInContainer(document.querySelector('div'), credentials)
    expect(embed.params()).toEqual({})
  })
})

describe('#changeScene', () => {
  it('works with valid parameters', () => {
    const embed = Embed.initInContainer(document.querySelector('div'), credentials)

    embed.postMessage = jest.fn()

    expect(embed.changeScene('scene_sc23')).toEqual({ name: 'changeScene', sceneId: 'scene_sc23' })
    expect(embed.changeScene('scene_sc23', 0)).toEqual({ name: 'changeScene', sceneId: 'scene_sc23', ath: 0 })

    const message = { name: 'changeScene', sceneId: 'scene_sc23', ath: 0, atv: 0 }

    expect(embed.changeScene('scene_sc23', 0, 0)).toEqual(message)
    expect(embed.changeScene('scene_sc23', '0', 0)).toEqual(message)
    expect(embed.changeScene('scene_sc23', 0, '0')).toEqual(message)
    expect(embed.changeScene('scene_sc23', '0', '0')).toEqual(message)

    expect(embed.postMessage.mock.calls.length).toBe(6)
  })

  it('throws specific errors with messages', () => {
    const embed = Embed.initInContainer(document.querySelector('div'), credentials)

    embed.postMessage = jest.fn()

    expect(() => embed.changeScene()).toThrow(/sceneId/)
    expect(() => embed.changeScene('scene_sc23', false)).toThrow(/ath/)
    expect(() => embed.changeScene('scene_sc23', 0, false)).toThrow(/atv/)
    expect(() => embed.changeScene('scene_sc23', '0', false)).toThrow(/atv/)

    expect(embed.postMessage.mock.calls.length).toBe(0)
  })
})
