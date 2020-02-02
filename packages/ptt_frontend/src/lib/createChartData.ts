export const createChartData = (items) => items
  .map(t => {
    return {
      y: t.people,
      x: new Date(t.rk.slice(3))
    }
  })
  .map((x, i, array) => {
    return {
      x: x.x,
      y: (x.y - ((array[i - 1]?.y) || x.y)),
    }
  })
  .slice(1)
