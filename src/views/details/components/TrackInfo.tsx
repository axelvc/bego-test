import { OrderDetails, StatusList } from '@/services/orders/orders.service'
import * as s from '../details.module.scss'

interface Props {
  details: OrderDetails
  type: string
}

export default function TrackInfo({ type, details }: Props) {
  const steps = details.status_list[type as keyof StatusList]

  return (
    <ol className={s.track__steps}>
      {steps.map(({ status }, i) => (
        <li className={s.track__step} key={i}>
          {status}
        </li>
      ))}
    </ol>
  )
}
