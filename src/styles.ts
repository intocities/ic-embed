const css = `
.ic-preview__container {
  position: 'relative';
  width: '100%';
  height: '100%';
  overflow: 'hidden';
  cursor: 'pointer';
}

.ic-preview__wrapper {
  position: 'absolute';
  top: '0';
  left: '0';
  width: '100%';
  height: '100%';
}

.ic-preview__image {
  width: '100%';
  height: '100%';
  object-fit: 'cover';
  z-index: '1';
}

.ic-preview__button {
  position: 'absolute';
  top: '50%';
  left: '50%';
  transform: 'translate(-50%, -50%)';
  z-index: '2';
  border-radius: '0.5em';
}
`
  .replace(/\n/g, '')
  .trim()

export function addPreviewStyles() {
  const style = document.createElement('style')
  style.innerHTML = css
  document.head.appendChild(style)
}
