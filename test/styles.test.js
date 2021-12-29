const { addStyles, STYLE_ELEMENT_ID } = require('../lib/styles')

beforeEach(() => {
  document.head.innerHTML = ''
  document.body.innerHTML = '<div></div>'
})

describe('addStyles', () => {
  it('add styles to head', () => {
    expect(document.getElementById(STYLE_ELEMENT_ID)).toBeNull()

    addStyles()

    expect(document.getElementById(STYLE_ELEMENT_ID)).toBeInstanceOf(HTMLStyleElement)
  });
});
