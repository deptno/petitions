import {parse} from 'date-fns'

export const createRowParser = (date: Date) =>
  item => item.map((c, i) => {
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
