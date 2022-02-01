const css = `
.ic-preview {
  --ic-preview__button-width: 8em;
  --ic-preview__button-height: 4.5em;
  --ic-preview__button-border-radius: 3px;
  --ic-preview__button-font-size: 2em;
  --ic-preview__button-color-back: hsl(0deg 0% 0% / 25%);
  --ic-preview__button-color-back--hover: hsl(0deg 0% 0% / 2.5%);

  --ic-preview__button-color-front: hsl(0deg 0% 100% / 97.5%);
  --ic-preview__button-color-front--hover: hsl(0deg 0% 100% / 100%);

  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  cursor: pointer;
}

.ic-preview__image {
  z-index: 1;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.3s ease;
}

.ic-preview__wrapper {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  max-height: 100%;
  justify-content: center;
  align-self: center;
  max-width: 100%;
  align-content: center;
  align-items: center;
}

.ic-preview__image--pano {
  display: block;
  max-height: 5rem;
  transition: all 0.3s ease;
}

.ic-preview:focus .ic-preview__image--pano,
.ic-preview:hover .ic-preview__image--pano,
.ic-preview__image--pano:focus,
.ic-preview__image--pano:hover {
  filter: drop-shadow(0 0 4px rgba(0, 0, 0, 0.25));
}

ic-button {
  display: block;
  max-width: var(--ic-preview__button-width);
  max-height: var(--ic-preview__button-height);
  font-size: var(--ic-preview__button-font-size);
  color: var(--ic-preview__button-color-front);
  text-align: center;
  text-decoration: none;
  text-shadow: 0 0 3px #000;
  cursor: pointer;
  line-height: 1.16;
  background-color: transparent;
  border: 0;
  transition: all 0.3s ease;
  backdrop-filter: blur(0.25px);
}

.ic-preview:focus ic-button,
.ic-preview:hover ic-button,
ic-button:focus,
ic-button:hover {
  color: var(--ic-preview__button-color-front--hover);
  text-shadow: 0 0 4px #000000f0;
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
