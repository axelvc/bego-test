import './Status.scss'
import clsx from 'clsx'

interface Props {
  status: string
  statusClass: string
  className?: string
}

export default function Status({ status, statusClass, className }: Props) {
  return (
    <div className={clsx('status', className)}>
      <div className={clsx('status__indicator', statusClass)} />
      {status}
    </div>
  )
}
