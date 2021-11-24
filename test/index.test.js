const IC = require('../dist/index');

test('', () => {
  expect(IC).toHaveProperty('embed')
})

describe('IC.embed', () => {
  test('without argument', () => {
    expect(() => IC.embed()).toThrow(/HTMLIFrameElement!/)
  })

  test('one String argument', () => {
    expect(() => IC.embed('iframe')).toThrow(/HTMLIFrameElement!/)
  })

  test('one HTMLIFrameElement argument', () => {
    expect(() => IC.embed(new HTMLIFrameElement())).toBeInstanceOf(Function)
  })
})
