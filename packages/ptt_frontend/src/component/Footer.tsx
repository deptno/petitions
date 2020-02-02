import {FunctionComponent} from 'react'

export const Footer: FunctionComponent<Props> = props => {
  return (
    <footer className="mv4 tr f3">
      <a className="link black" href="http://bglee.me" target="_blank">
          <span className="f6 mh2 lh-copy">
            about
          </span>
      </a>
      <a className="link black" href="http://github.com/deptno/petitions" target="_blank">
        <i className="fab fa-github"/>
      </a>
    </footer>
  )
}

type Props = {}
