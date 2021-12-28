const { Embed } = require('../lib/embed')
const { TourProxy } = require('../lib/tour_proxy')
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

describe('#changeScene', () => {
  it('works with valid parameters', () => {
    const tour = Embed.initInContainer(document.querySelector('div'), credentials).tour

    tour.postMessage = jest.fn()

    expect(tour.changeScene('scene_sc23')).toEqual({ name: 'changeScene', sceneId: 'scene_sc23' })
    expect(tour.changeScene('scene_sc23', 0)).toEqual({ name: 'changeScene', sceneId: 'scene_sc23', ath: 0 })

    const message = { name: 'changeScene', sceneId: 'scene_sc23', ath: 0, atv: 0 }

    expect(tour.changeScene('scene_sc23', 0, 0)).toEqual(message)
    expect(tour.changeScene('scene_sc23', '0', 0)).toEqual(message)
    expect(tour.changeScene('scene_sc23', 0, '0')).toEqual(message)
    expect(tour.changeScene('scene_sc23', '0', '0')).toEqual(message)

    expect(tour.postMessage.mock.calls.length).toBe(6)
  })

  it('throws specific errors with messages', () => {
    const tour = Embed.initInContainer(document.querySelector('div'), credentials).tour

    tour.postMessage = jest.fn()

    expect(() => tour.changeScene()).toThrow(/sceneId/)
    expect(() => tour.changeScene('scene_sc23', false)).toThrow(/ath/)
    expect(() => tour.changeScene('scene_sc23', 0, false)).toThrow(/atv/)
    expect(() => tour.changeScene('scene_sc23', '0', false)).toThrow(/atv/)

    expect(tour.postMessage.mock.calls.length).toBe(0)
  })
})

describe('#params', () => {
  it('returns an object', () => {
    const tour = Embed.initInContainer(document.querySelector('div'), credentials).tour
    expect(tour.params()).toEqual({})
  })
})
