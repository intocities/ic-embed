const IC = require('../lib/index')

describe('IC', () => {
  it('has properties', () => {
    expect(IC).toHaveProperty('embed')
    expect(IC).toHaveProperty('preview')
  })
})

let credentials = { id: 42, key: 'something' }

describe('IC.embed', () => {
  beforeEach(() => {
    window.document.body.appendChild(document.createElement('iframe'))
  })

  it('rejects with an error message', () => {
    // @ts-ignore
    fetch.mockResponseOnce(JSON.stringify({ poi: { id: 42, tour_present: true }, origin: 'https://example.com' }))

    return expect(IC.embed(document.querySelector('iframe'), credentials)).rejects.toThrow(/origin/)
  })

  it('resolves an object with changeScene property', () => {
    // @ts-ignore
    fetch.mockResponseOnce(JSON.stringify({ poi: { id: 42, tour_present: true }, origin: window.location.origin }))

    return expect(IC.embed(document.querySelector('iframe'), credentials)).resolves.toHaveProperty('tour')
  })
})

describe('IC.preview', () => {
  beforeEach(() => {
    window.document.body.appendChild(document.createElement('div'))
  })

  it('resolves an object with mount property', () => {
    // @ts-ignore
    fetch.mockResponseOnce(
      JSON.stringify({
        poi: { id: 42, tour_present: true, thumbnail_urls: { landscape: 'dummy.png' } },
        origin: window.location.origin
      })
    )

    return expect(IC.preview(document.querySelector('div'), credentials)).resolves.toHaveProperty('mount')
  })
})
