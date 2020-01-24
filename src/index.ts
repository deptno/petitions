import fetch from 'isomorphic-unfetch'
import domino from 'domino'

async function main() {
  const url = 'https://www1.president.go.kr/petitions/best'

  const response = await fetch(url)
  const html = await response.text()

  const dom = domino.createDocument(html)
  const [_, board] = Array.from(
    dom.querySelectorAll('.category')
  )
  const elItems = board.querySelectorAll('.bl_body .bl_wrap')
  const getTextFromNode = (c: any) => {
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
  const texts = elItems.map(
    item => Array.from(item.children).map(getTextFromNode)
  )
  console.table(texts)
}

main()


enum Node {
  ELEMENT_NODE = 1
}
