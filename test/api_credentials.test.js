const { ApiCredentials } = require('../lib/api_credentials')

beforeAll(async () => {
  // @ts-ignore
  fetch.mockResponseOnce(
    JSON.stringify({
      poi: { id: 42, tour_present: true, thumbnail_urls: { landscape: 'dummy.png' } },
      origin: window.location.origin
    })
  )
})

describe('#validate', () => {
  it('resolves valid', () => {
    let credentials = new ApiCredentials(42, 'something', 'https://localhost')

    expect(credentials.validate()).resolves.toBe(true)
  })

  it('rejects invalid', () => {
    let credentials = new ApiCredentials(23, 'something_else', 'https://localhost')

    expect(credentials.validate()).rejects.toThrowError(/invalid/)
  })
})

describe('#iframeUrl', () => {
  it('returns a URL', () => {
    let credentials = new ApiCredentials(42, 'something', 'https://localhost/')

    expect(credentials.iframeUrl).toBe('https://localhost/embed/42/something')
  })
})

describe('.cdnUrl', () => {
  it('returns the url', () => {
    expect(ApiCredentials.cdnUrl).toBe('https://cdn.intocities.com')
  })
})
