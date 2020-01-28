import {NextPage} from 'next'
import Head from 'next/head'
import fetch from 'cross-fetch'
import {useEffect} from 'react'

declare const Chart

export const DetailPage: NextPage<Props> = props => {
  const {no, items} = props

  useEffect(() => {
    const ctx = (document.getElementById('chart') as any).getContext('2d')
    const chart = new Chart(ctx, {
      type   : 'bar',
      data   : {
        labels  : items.map(t => t.rk.slice(3)),
        datasets: [{
          label: `#${no} 청원자 수`,
          data : items.map(t => t.people),
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    })
  }, [])

  return (
    <div>
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
        <script
          type="application/javascript"
          src="https://cdn.jsdelivr.net/npm/chart.js@2.9.3/dist/Chart.min.js"
        />
      </Head>
      <h1>
        청원 번호: #{no}
      </h1>
      <canvas id="chart" width="400" height="400"/>
    </div>
  )
}
DetailPage.getInitialProps = async (ctx) => {
  const {no} = ctx.query as { [key: string]: string }
  const items = await fetch(`http://localhost:3000/api/chart/${no}`).then(response => response.json())

  return {
    items,
    no
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
}
