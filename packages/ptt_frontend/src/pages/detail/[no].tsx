import {NextPage} from 'next'
import Head from 'next/head'
import fetch from 'cross-fetch'
import {useEffect, useState} from 'react'
import {Script} from 'react-script-fall'

declare const Chart, moment

export const DetailPage: NextPage<Props> = props => {
  const {no, title, items} = props
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (ready) {
      const ctx = (document.getElementById('chart') as any).getContext('2d')
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
      })
      const chart = new Chart(ctx, {
        data   : {
          datasets: [
            {
              label          : '✋',
              data           : data.map((x, i, array) => {
                return {
                  x: x.x,
                  y: (x.y - ((array[i - 1]?.y) || x.y)),
                }
              }).slice(1),
              backgroundColor: color(chartColors.red).alpha(0.5).rgbString(),
              borderColor    : chartColors.red,
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
              type           : 'time',
              distribution   : 'series',
              time           : {
                tooltipFormat : 'MM/DD HH:mm',
                displayFormats: {
                  hour: 'HH:mm',
                  day : 'MM/DD'
                }
              },
              offset         : true,
              ticks          : {
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
              afterBuildTicks: function (scale, ticks) {
                let majorUnit = scale._majorUnit
                if (ticks) {
                  let firstTick = ticks[0]
                  let i, ilen, val, tick, currMajor, lastMajor

                  val = moment(ticks[0].value)
                  if ((majorUnit === 'minute' && val.second() === 0)
                    || (majorUnit === 'hour' && val.minute() === 0)
                    || (majorUnit === 'day' && val.hour() === 9)
                    || (majorUnit === 'month' && val.date() <= 3 && val.isoWeekday() === 1)
                    || (majorUnit === 'year' && val.month() === 0)) {
                    firstTick.major = true
                  } else {
                    firstTick.major = false
                  }
                  lastMajor = val.get(majorUnit)

                  for (i = 1, ilen = ticks.length; i < ilen; i++) {
                    tick = ticks[i]
                    val = moment(tick.value)
                    currMajor = val.get(majorUnit)
                    tick.major = currMajor !== lastMajor
                    lastMajor = currMajor
                  }
                }
                return ticks
              }
            }],
            yAxes: [{
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
                var label = myData.datasets[tooltipItem.datasetIndex].label || ''
                if (label) {
                  label += ': '
                }
                label += parseFloat(tooltipItem.value)
                return label
              }
            }
          }
        }
      })
    }
  }, [ready])

  return (
    <div className="pa3">
      <Head>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/tachyons/4.11.1/tachyons.min.css"
        />
      </Head>
      <h1>
        #{no} {title}
      </h1>
      <div className="w-50">
        <canvas id="chart" width="1024" height="300"/>
      </div>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment.min.js">
        <Script src="https://cdn.jsdelivr.net/npm/chart.js@2.9.3/dist/Chart.min.js">
          <Script src="/chartjs-chart-financial.min.js" onLoad={setReady}/>
        </Script>
      </Script>
    </div>
  )
}
DetailPage.getInitialProps = async (ctx) => {
  const {no} = ctx.query as { [key: string]: string }
  const {title} = await fetch(`http://localhost:3000/api/petition/${no}`).then(response => response.json())
  const items = await fetch(`http://localhost:3000/api/chart/${no}`).then(response => response.json())

  return {
    items,
    no,
    title
  }
}
export default DetailPage

type Props = {
  items: {
    hk: number
    rk: string
    people: number
    ttl: number
  }[]
  no: string
  title: string
}
