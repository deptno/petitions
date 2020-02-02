import {NextPage} from 'next'
import Head from 'next/head'
import {Script} from 'react-script-fall'
import {graphql} from '../../lib/graphql'
import {ChangeChart} from '../../component/ChangeChart'
import {useState} from 'react'
import {Header} from '../../component/Header'
import {AccChart} from '../../component/AccChart'
import Link from 'next/link'

export const DetailPage: NextPage<Props> = props => {
  const [chartLoaded, setChartLoaded] = useState(false)
  const {no, title, people, remains, endDate, items} = props

  return (
    <div className="page ml-auto mr-auto">
      <style jsx>
        {/* language=css */ `
            .page {
                max-width: 976px;
            }
        `}
      </style>
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
      <Header/>
      <div className="ph3">
        <h1>
          {title}
        </h1>
        <p className="flex flex-column w-100">
          <span>🙋🏻‍♀️ {people} 명</span>
          <span className="red">⏳ {remains} 남음<span className="black-70">({endDate})</span></span>
        </p>
        {chartLoaded && (
          <div className="flex flex-column">
            <div>
              <h5 className="mv3">변화율</h5>
              <ChangeChart items={items}/>
            </div>
            <div>
              <h5 className="mv3">누적</h5>
              <AccChart items={items}/>
            </div>
          </div>
        )}
        <p className="flex flex-column items-end mv4 tc">
          <a className="w4-ns w-50 link ph2 pv1 ba black-70" target="_blank"
             href={`https://www1.president.go.kr/petitions/${no}`}>
            청원 페이지로 ⇥
          </a>
          <Link href="/">
            <a className="w4-ns w-50 link ph2 pv1 ba black-70 mt1">
              목록
            </a>
          </Link>
        </p>
      </div>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment.min.js">
        <Script src="https://cdn.jsdelivr.net/npm/chart.js@2.9.3/dist/Chart.min.js">
          <Script src="/chartjs-chart-financial.min.js" onLoad={setChartLoaded}/>
        </Script>
      </Script>
    </div>
  )
}
DetailPage.getInitialProps = async (ctx) => {
  const {no} = ctx.query as { [key: string]: string }
  const {petition: {title, people, remains, endDate}, chart: items} = await graphql(/* language=graphql */ `
    query ($no: Int!){
      petition(id: $no) {
        category
        remains
        endDate
        no
        title
        people
      }
      chart(petitionId: $no) {
        hk
        rk
        people
        ttl
      }
    }
  `, {no: Number(no)})

  return {
    items,
    no,
    title,
    people,
    remains,
    endDate
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
  people: number
  remains: string
  endDate: String
}
