import {useEffect, useState} from 'react'
import {NextPage} from 'next'
import Error from 'next/error'
import Router from 'next/router'

export const ErrorPage: NextPage<Props> = props => {
  const [error, setError] = useState(false)

  useEffect(() => {
    const [, , petition, no] = location.pathname.split('/')

    if (petition === 'petition') {
      Router.replace('/petition/[no]', `/petition/${no}`)
    } else {
      setError(true)
    }
  }, [])

  if (error) {
    return <Error statusCode={404} />
  }
  return (
    <div className="w-100 vh-100">
      이동중
    </div>
  )
}

export default ErrorPage

type Props = {}
