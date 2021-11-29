const css = `
.ic-preview {
  --ic-preview__button-color-back: hsl(0deg 0% 0% / 50%);
  --ic-preview__button-color-front: hsl(0deg 0% 100% / 100%);
  --ic-preview__button-width: 10em;
  --ic-preview__button-height: 10em;
  --ic-preview__button-border-radius: 50%;

  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  cursor: pointer;
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
  box-shadow: 0 0 1.5em 0 var(--ic-preview__button-color-back);
  border: 2px solid var(--ic-preview__button-color-back);
  border-radius: var(--ic-preview__button-border-radius);

  height: var(--ic-preview__button-height);
  width: var(--ic-preview__button-width);

  transition: all 0.3s ease;
}

.ic-preview:focus .ic-preview__button,
.ic-preview:hover .ic-preview__button {
  box-shadow: 0 0 1.5em 0 var(--ic-preview__button-color-front);
  border-color: var(--ic-preview__button-color-front);
}

.ic-embed__iframe {
  width: 100%;
  height: 100%;
  border: none;
  overflow: hidden;
}`
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
