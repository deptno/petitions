import {NextPage} from 'next'
import Head from 'next/head'
import {Script} from 'react-script-fall'
import {graphql} from '../../lib/graphql'
import {ChangeChart} from '../../component/ChangeChart'
import React, {useEffect, useState} from 'react'
import {Header} from '../../component/Header'
import {AccChart} from '../../component/AccChart'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {PetitionTick} from '@deptno/ptt_graphql'
import {Footer} from '../../component/Footer'
import {NextSeo} from 'next-seo'

export const DetailPage: NextPage<{}> = props => {
  const [chartLoaded, setChartLoaded] = useState(false)
  const [data, setData] = useState({
    title: '불러 오는 중',
    endDate: '-',
    remains: '-',
    people: 0,
    chart: [],
  } as Data)
  const {title, people, remains, endDate, chart} = data
  const {query: {no}} = useRouter()

  useEffect(() => {
    if (no) {
      graphql(/* language=graphql */ `
        query ($no: Int!) {
          petition(id: $no) {
            category
            remains
            endDate
            no
            title
            people
          }
          chart(petitionId: $no) {
            no
            at
            people
          }
        }
      `, {no: Number(no)}).then(({petition, chart}) => {
        const {title, people, remains, endDate} = petition

        setData({title, people, remains, endDate, chart})
      })
    }
  }, [no])

  return (
    <div className="page ml-auto mr-auto">
      <NextSeo
        title="청와대 국민청원 차트"
        description="비공식 국민청원 순위 차트"
        canonical="https://deptno.github.io/petitions/"
        openGraph={{
          url: 'https://deptno.github.io/petitions/',
          title: '청와대 국민청원 차트',
          description: '청와대 국민청원 순위 차트, 그래프',
          images: [
            { url: 'https://deptno.github.io/petitions/logo.png' },
          ],
          site_name: '청와대 국민청원 차트',
        }}
        twitter={{
          handle: '@deptno',
          site: '@deptno',
          cardType: 'summary_large_image',
        }}
      />
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
      <div className="ph3 black-70">
        <h1 className="f3">
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
              <ChangeChart items={chart}/>
            </div>
            <div>
              <h5 className="mv3">누적</h5>
              <AccChart items={chart}/>
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
      <Footer />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment.min.js">
        <Script src="https://cdn.jsdelivr.net/npm/chart.js@2.9.3/dist/Chart.min.js" onLoad={setChartLoaded} />
      </Script>
    </div>
  )
}

export default DetailPage

type Data = {
  chart: PetitionTick[]
  title: string
  people: number
  remains: string
  endDate: String
}
