const { urlWithTourOptions } = require('../lib/utils')

describe('urlWithTourOptions', () => {
  it('adds just permitted attributes', () => {
    const url = urlWithTourOptions('http://example.com/resource', {
      scene: 'c1234/scene_sc3_Overlay_1',
      ath: 3,
      baz: '?'
    })
    expect(url).toBe('http://example.com/resource#scene=c1234%2Fscene_sc3_Overlay_1&ath=3')
  })

  it('adds no attributes', () => {
    const url = urlWithTourOptions('http://example.com/resource')
    expect(url).toBe('http://example.com/resource')
  })
})
