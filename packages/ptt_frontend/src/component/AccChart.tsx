import {FunctionComponent, useEffect, useRef} from 'react'

declare const Chart, moment

export const AccChart: FunctionComponent<Props> = props => {
  const ref = useRef<HTMLCanvasElement>()
  const {items} = props

  useEffect(() => {
    const canvas = ref.current

    if (canvas) {
      const ctx = canvas.getContext('2d')
      const chartColors = {
        red   : 'rgb(255, 99, 132)',
        orange: 'rgb(255, 159, 64)',
        yellow: 'rgb(255, 205, 86)',
        green : 'rgb(75, 192, 192)',
        blue  : 'rgb(54, 162, 235)',
        purple: 'rgb(153, 102, 255)',
        grey  : 'rgb(201, 203, 207)',
      }
      const color = Chart.helpers.color
      const data = items.map(t => {
        return {
          y: t.people,
          x: new Date(t.rk.slice(3))
        }
      }).slice(1)
      const chart = new Chart(ctx, {
        data   : {
          datasets: [
            {
              label          : '',
              data           : data,
              backgroundColor: color(chartColors.blue).alpha(0.5).rgbString(),
              borderColor    : chartColors.blue,
              type           : 'bar',
              pointRadius    : 0,
              fill           : false,
              lineTension    : 0,
              borderWidth    : 2
            }]
        },
        options: {
          animation: {
            duration: 3000
          },
          scales   : {
            xAxes: [{
              type        : 'time',
              distribution: 'series',
              time        : {
                tooltipFormat : 'MM/DD HH:mm',
                displayFormats: {
                  month: '📆 MM/DD',
                  hour: 'HH:mm',
                  day : 'MM/DD'
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
              ticks: {
                display: false,
              },
              gridLines : {
                drawBorder: false
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
    }
  }, [])

  return <canvas ref={ref} id="acc-chart" width="400" height="200"/>
}

type Props = {
  items: any[]
}
