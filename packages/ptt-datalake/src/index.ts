import fetch from 'isomorphic-unfetch'
import domino from 'domino'
import {concat, converge, flatten, map, merge, pipe, prop, remove, zipObj} from 'ramda'
import {format, parse} from 'date-fns'
import {parse as parseUrl} from 'url'
import {basename} from 'path'
import {util} from '@deptno/dynamodb'

async function main() {
  try {
    const url = 'https://www1.president.go.kr/petitions/best'
    const response = await fetch(url)
    const html = await response.text()
    const dom = domino.createDocument(html)
    const [_, board] = Array.from(dom.querySelectorAll('.category'))
    const elItems = board.querySelectorAll('.bl_body .bl_wrap')
    const date = new Date()
    const yyyyMMDdTHHMmxx = 'yyyy-MM-dd\'T\'HH:mmxx'
    const dateX = format(date, yyyyMMDdTHHMmxx)
    const acc: AccDocument[] = elItems
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
            case 0:
              return parseInt(c)
            case 2:
              return c.slice(3)
            case 3:
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
          (item: any) => {
            const ttl = util.ttl(item.endDate)

            return {
              ...item,
              ttl,
              endDate: format(item.endDate, yyyyMMDdTHHMmxx),
              rk     : 'acc',
              gsi1   : ~~((ttl - util.ttl(date)) / const_min_5),
            }
          }
        )
      )
      .filter(a => a.ttl - util.ttl(date) > 0)

    const at: AtDocument[] = acc
      .map(a => {
        return {
          hk    : a.hk,
          rk    : `at#${dateX}`,
          people: a.people,
          min5  : ~~((a.ttl - util.ttl(date)) / const_min_5),
        }
      })

    console.table(acc)
    console.table(at)
  } catch (e) {
    console.error('error', e)
  }

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

const const_min_5 = 60 * 5
type AccDocument = {
  hk: number
  rk: 'acc'
  category: string
  title: string
  endDate: string
  people: number
  ttl: number
}
type AtDocument = {
  hk: number
  rk: string | 'at#[END_DATE]'
  people: number
}
