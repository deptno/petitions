import {FunctionComponent, useEffect, useRef, useState} from 'react'
import {const_colors} from '../constant'
import {PetitionTick} from '@deptno/ptt_graphql'

declare const Chart, moment

export const ChangeChart: FunctionComponent<Props> = props => {
  const ref = useRef<HTMLCanvasElement>()
  const [chart, setChart] = useState()
  const {items} = props

  useEffect(() => {
    const canvas = ref.current

    if (canvas) {
      const ctx = canvas.getContext('2d')
      const color = Chart.helpers.color
      const chart = new Chart(ctx, {
        data   : {
          datasets: [
            {
              label          : '',
              data           : createChartData(items),
              backgroundColor: color(const_colors.green).alpha(0.5).rgbString(),
              borderColor    : const_colors.green,
              type           : 'bar',
              pointRadius    : 0,
              fill           : false,
              lineTension    : 0,
              borderWidth    : 2
            }]
        },
        options: {
          scales   : {
            xAxes: [{
              type        : 'time',
              distribution: 'series',
              time        : {
                tooltipFormat : 'MM/DD HH:mm',
                displayFormats: {
                  month: '📆 MM/DD',
                  hour : 'HH:mm',
                  day  : 'MM/DD'
                }
              },
              offset      : true,
              ticks       : {
                major          : {
                  enabled  : true,
                  fontStyle: 'bold'
                },
                source         : 'data',
                autoSkip       : true,
                autoSkipPadding: 75,
                maxRotation    : 0,
                sampleSize     : 100
              },
              afterBuildTicks(scale, ticks) {
                const majorUnit = scale._majorUnit

                if (ticks) {
                  const firstTick = ticks[0]
                  const val = moment(ticks[0].value)

                  firstTick.major = (majorUnit === 'minute' && val.second() === 0)
                    || (majorUnit === 'hour' && val.minute() === 0)
                    || (majorUnit === 'day' && val.hour() === 9)
                    || (majorUnit === 'month' && val.date() <= 3 && val.isoWeekday() === 1)
                    || (majorUnit === 'year' && val.month() === 0)

                  let lastMajor = val.get(majorUnit)

                  for (let i = 1; i < ticks.length; i++) {
                    const currMajor = moment(ticks[i].value).get(majorUnit)
                    ticks[i].major = currMajor !== lastMajor
                    lastMajor = currMajor
                  }
                }

                return ticks
              }
            }],
            yAxes: [{
              ticks     : {
                display: false,
              },
              gridLines : {
                drawBorder: true
              },
              scaleLabel: {
                labelString: '청원수'
              }
            }]
          },
          legend   : {
            display: false
          },
          tooltips : {
            intersect: false,
            mode     : 'index',
            callbacks: {
              label: function (tooltipItem, myData) {
                return ` ${tooltipItem.value}`
              }
            }
          }
        }
      })

      setChart(chart)
    }
  }, [])
  useEffect(() => {
    if (chart) {
      if (items.length > 0) {
        chart.data.datasets[0].data = createChartData(items)
        chart.update()
      }
    }
  }, [chart, items])

  return <canvas ref={ref} id="change-chart" width="400" height="200"/>
}

const createChartData = (items: PetitionTick[]) => items
  .map(t => {
    return {
      x: t.at,
      y: t.people,
    }
  })
  .map((x, i, array) => {
    return {
      x: x.x,
      y: (x.y - ((array[i - 1]?.y) || x.y)),
    }
  })
  .slice(1)

type Props = {
  items: PetitionTick[]
}
