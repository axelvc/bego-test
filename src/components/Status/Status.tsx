import './Status.scss'
import clsx from 'clsx'

interface Props {
  className?: string
}

export default function Status({ className }: Props) {
  return (
    <div className={clsx('status', className)}>
      <div className="status__indicator" />
      Asigned
    </div>
  )
}
