const css = `

.ic-preview {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  cursor: pointer;

  --ic-preview__button-color-back: hsl(0deg 0% 0% / 50%);
  --ic-preview__button-color-front: hsl(0deg 0% 100% / 100%);
  --ic-preview__button-size: 10em;
}

.ic-preview__wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.ic-preview__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
}

.ic-preview__button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;

  cursor: pointer;
  display: block;

  color: var(--ic-preview__button-color-front);
  background-color: var(--ic-preview__button-color-back);
  box-shadow: 0 0 20px 0px var(--ic-preview__button-color-back);
  border: 1px solid var(--ic-preview__button-color-back);
  border-radius: 50%;

  height: var(--ic-preview__button-size);
  width: var(--ic-preview__button-size);
}

.ic-embed__iframe {
  width: 100%;
  height: 100%;
  border: none;
  overflow: hidden;
}
`
  .replace(/\n/g, '')
  .replace(/\s\s+/g, ' ')
  .trim()

const STYLE_ELEMENT_ID = 'ic-embed-styles'

export function addStyles() {
  if (document.getElementById(STYLE_ELEMENT_ID)) return

  const style = document.createElement('style')
  style.id = STYLE_ELEMENT_ID
  style.innerHTML = css
  document.head.appendChild(style)
}
