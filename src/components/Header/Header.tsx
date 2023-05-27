import { ReactComponent as BackIcon } from '@/assets/angle-small-left.svg'
import { ReactComponent as BellIcon } from '@/assets/bell.svg'
import * as s from './Header.module.scss'

interface Props {
  title: string
}

export default function Header({ title }: Props) {
  return (
    <header className="header">
      <button type="button" title="Go back" className={s.header__back}>
        <BackIcon />
      </button>

      <h1 className={s.header__title}>{title}</h1>

      <button type="button" title="Notifications" className={s.header__notifications}>
        <BellIcon />
      </button>
    </header>
  )
}
