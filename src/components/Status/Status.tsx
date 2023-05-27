import clsx from 'clsx'
import * as s from './Status.module.scss'

interface Props {
  status: string
  statusClass: string
  className?: string
}

export default function Status({ status, statusClass, className }: Props) {
  return (
    <div className={clsx(s.status, className)}>
      <div className={clsx(s.status__indicator, statusClass)} />
      {status}
    </div>
  )
}
