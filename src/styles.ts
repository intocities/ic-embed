const css = `
.ic-preview {
  --ic-preview__button-width: 8em;
  --ic-preview__button-height: 4.5em;
  --ic-preview__button-border-radius: 3px;
  --ic-preview__button-font-size: 1.25em;
  --ic-preview__button-color-back: hsl(0deg 0% 0% / 75%);
  --ic-preview__button-color-back--hover: hsl(0deg 0% 0% / 87.5%);
  --ic-preview__button-color-front: hsl(0deg 0% 90% / 87.5%);
  --ic-preview__button-color-front--hover: hsl(0deg 0% 95% / 100%);
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
  z-index: 1;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.ic-preview__button {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 2;
  display: block;
  width: var(--ic-preview__button-width);
  height: var(--ic-preview__button-height);
  font-size: var(--ic-preview__button-font-size);
  color: var(--ic-preview__button-color-front);
  cursor: pointer;
  background-color: var(--ic-preview__button-color-back);
  border: 1px solid var(--ic-preview__button-color-back);
  border-radius: var(--ic-preview__button-border-radius);
  box-shadow: 0 0 0.5em 0 var(--ic-preview__button-color-back);
  transition: all 0.3s ease;
  transform: translate(-50%, -50%);
}

.ic-preview:focus .ic-preview__button,
.ic-preview:hover .ic-preview__button {
  color: var(--ic-preview__button-color-front--hover);
  background-color: var(--ic-preview__button-color-back--hover);
  border-color: var(--ic-preview__button-color-back--hover);
  box-shadow: 0 0 0.5em 0 var(--ic-preview__button-color-back--hover);
}

.ic-embed__iframe {
  width: 100%;
  height: 100%;
  overflow: hidden;
  border: none;
}`

export const STYLE_ELEMENT_ID = 'ic-embed-styles'

export function addStyles() {
  if (document.getElementById(STYLE_ELEMENT_ID)) return

  const style = document.createElement('style')
  style.id = STYLE_ELEMENT_ID
  style.innerHTML = css
  document.head.appendChild(style)
}
