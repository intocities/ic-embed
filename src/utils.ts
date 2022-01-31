interface Link {
  href: string
  rel: string
  type?: string
  as?: string
}

export function batchAddLinksToHead(links: Link[]): void {
  links.forEach((link) => {
    addLinkToHead(link)
  })
}

export function addLinkToHead(attributes: Link): void {
  const link = document.createElement('link')
  link.href = attributes.href
  link.rel = attributes.rel

  if (attributes.type) {
    link.type = attributes.type
  }

  if (attributes.as) {
    link.as = attributes.as
  }

  document.head.appendChild(link)
}

export function encodedPanoIcon(): string {
  return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMEAAADCCAMAAADHCFYAAAAB1FBMVEUAAAD////////////////////////////////////////////////////////////////////////////////////////////////////////4+Pjo6Ojg4ODw8PDw8PD////4+PjIyMiwsLCgoKCAgIBQUFAwMDBISEiAgICwsLC4uLj////g4OC4uLiYmJhoaGhAQEAoKCgICAgAAAAAAABQUFCgoKDAwMDAwMD///9ISEgAAAA4ODiYmJioqKh4eHhYWFgoKCjQ0NBQUFAYGBgAAAAAAAAICAhoaGiQkJAQEBCIiIi8vLygoKD///8YGBj////IyMhwcHAgICAQEBDAwMCgoKDIyMioqKhoaGi4uLhYWFiwsLBwcHB4eHiwsLAwMDCIiIiAgIBgYGBYWFgwMDDAwMCIiIhgYGB4eHhgYGBAQEAQEBBwcHCQkJCoqKi4uLjAwMDIyMjQ0NDY2Njg4OCgoKDQ0NDY2Njo6Ojg4ODo6Ojo6OiwsLCQkJDo6OiSkpKQkJCSkpKTk5PIyMiYmJiUlJTw8PDQ0NCYmJiQkJD4+Pi4uLjQ0NCQkJCIiIiPj4/AwMDY2NggICDY2NhISEgoKCjU1NTQ0NDY2NiYmJivOtfYAAAAnHRSTlMAGCg4UHCAkKCwyNDY4OggQGCI8P8IuEj4mDDw6ODw6BD42Mi4oJCAgJiosGjo0LCYgHBgYFiAoLiweIhoeKComIh42IhwZGZoiKBosLSowGio0KBwYLTAuMCQyJCwkKDAeKCokIBw0JiIkJh4cJiosLjAwMjQ0LDAyNDY4Ni4mPCbnJycyKic+OC4sOjA0JqQmMjYaNGQgMjM4Ji9wWYnAAAToUlEQVR4AdTUQ2JFQRAF0FvPtj3P/rcTaZRR7IrxbZ0FdJcl7Lrdz4BW8GQPANwDW831/EA37TAaIbRNPfA9F9sodqUgGRV7fx5JILkxtgmlShJGMwkTJaVtCV/SrCyaQ2ZpEm1B+LkdLcDOJdrkLSouZB0jqEQs0AsAkV+J+QEj3D1F55vJoDuVDcIA+1WkH/jBP16EKwzg26fqcO0Z0N6+MRC89RM5vadxDdh0CcDhK8B6D57BX64H0rh948Uq1BvngeAxMzODU3Yzvm/TOkRyLi7kGpeZ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'
}
