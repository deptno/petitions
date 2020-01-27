import {Node} from '../type'

export const getTextFromNode = (c: any) => {
  return Array.from(c.childNodes)
    .reduce<string>((out, cc: Element) => {
      if (cc.nodeType === Node.ELEMENT_NODE) {
        if (cc.classList) {
          if (cc.classList.contains('sound_only')) {
            return out
          }
        }
      }
      return out + (cc.textContent || '')
    }, '')
    .trim()
}
