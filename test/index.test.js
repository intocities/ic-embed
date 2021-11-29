const IC = require('../lib/index')

test('', () => {
  expect(IC).toHaveProperty('embed')
  expect(IC).toHaveProperty('preview')
})

describe('IC.embed', () => {
  const credentials = { id: 42, key: 'something' }
  const iframe = document.createElement('iframe')

  it('throws an error w/ message', () => {
    // @ts-ignore
    fetch.mockResponseOnce(JSON.stringify({ poi: { id: 42, tour_present: true }, origin: null }))

    return IC.embed(iframe, credentials).catch((e) => expect(e.message).toMatch(/validation/))
  })

  it('returns an instance of Embed', async () => {
    // @ts-ignore
    fetch.mockResponseOnce(JSON.stringify({ poi: { id: 42, tour_present: true }, origin: 'https://localhost' }))

    const embed = IC.embed(iframe, credentials)

    expect(embed).resolves.toHaveProperty('mount')
    expect(embed).resolves.toHaveProperty('params')
    expect(embed).resolves.toHaveProperty('changeScene')
  })
})
