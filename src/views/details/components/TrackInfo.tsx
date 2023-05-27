import { OrderDetails, StatusList } from '@/services/orders/orders.service'
import clsx from 'clsx'
import s from '../details.module.scss'

interface Props {
  details: OrderDetails
  type: string
}

export default function TrackInfo({ type, details }: Props) {
  const steps = details.status_list[type as keyof StatusList]

  return (
    <ol className={s.track__steps}>
      {steps.map(({ active, status }, i) => (
        <li className={clsx(s.track__step, { [s.active]: active })} key={i}>
          <div className={clsx(s.track__step__decorator, { [s.active]: active })}>
            <div className={s.track__step__line} />
          </div>

          {status}
        </li>
      ))}
    </ol>
  )
}
