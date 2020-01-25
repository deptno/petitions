import fetch from 'isomorphic-unfetch'
import domino from 'domino'
import {concat, converge, flatten, map, merge, pipe, prop, remove, zipObj} from 'ramda'
import {parse} from 'date-fns'
import {parse as parseUrl} from 'url'
import {basename} from 'path'
import {util} from '@deptno/dynamodb'

async function main() {
  const url = 'https://www1.president.go.kr/petitions/best'
  const response = await fetch(url)
  const html = await response.text()
  const dom = domino.createDocument(html)
  const [_, board] = Array.from(dom.querySelectorAll('.category'))
  const elItems = board.querySelectorAll('.bl_body .bl_wrap')
  const date = new Date()
  const texts = elItems
    .map(
      converge(
        concat,
        [
          el => {
            const {pathname} = parseUrl(el.querySelector('.bl_subject').firstElementChild.href)
            return [basename(pathname!)]
          },
          pipe(
            prop('children'),
            Array.from,
            remove(3, 1),
            remove(0, 1),
            map(getTextFromNode),
          ),
        ]
      )
    )
    .map(item =>
      item.map((c, i) => {
        switch (i) {
          case 2:
            return c.slice(3)
          case 3:
            console.log(c)
            return parse(c, 'yy-MM-dd', date)
          case 4:
            return parseInt(
              c
                .slice(0, -1)
                .replace(/,/g, '')
            )
          default:
            return c
        }
      })
    )
    .map(
      pipe(
        zipObj(['hk', 'category', 'title', 'endDate', 'people']),
        (item: any) => ({
          ...item,
          ttl: util.ttl(item.endDate),
        })
      )
    )

  console.table(texts)
}

main()

enum Node {
  ELEMENT_NODE = 1
}

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
