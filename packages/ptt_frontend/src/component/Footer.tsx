import {FunctionComponent} from 'react'
import Link from 'next/link'

export const Footer: FunctionComponent<Props> = props => {
  return (
    <footer className="w-100 tc f7 pa4 black-70">
      ⚠️ 본 사이트는 청와대와 관련이 없습니다.
    </footer>
  )
}

type Props = {}
