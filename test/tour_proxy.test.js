const { TourProxy } = require('../lib/tour_proxy')

beforeEach(() => {
  document.head.innerHTML = ''
  document.body.innerHTML = '<div><iframe /></div>'
})

describe('#changeScene', () => {
  it('works with valid parameters', () => {
    const tour = new TourProxy(document.querySelector('iframe'))

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
    const tour = new TourProxy(document.querySelector('iframe'))

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
    const tour = new TourProxy(document.querySelector('iframe'))
    expect(tour.params()).toEqual({})
  })
})
