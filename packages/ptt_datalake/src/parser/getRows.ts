import {concat, converge, map, pipe, prop, remove} from 'ramda'
import {parse as parseUrl} from 'url'
import {basename} from 'path'
import {getTextFromNode} from './getTextFromNode'
import * as domino from 'domino'

export const getRows = (html: string) => {
  const dom = domino.createDocument(html)
  const [_, board] = Array.from(dom.querySelectorAll('.category'))
  const elItems = board.querySelectorAll('.bl_body .bl_wrap')

  return elItems.map(
    converge(
      concat,
      [
        el => {
          const href = el.querySelector('.bl_subject').firstElementChild.href
          const {pathname} = parseUrl(href)

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
}
