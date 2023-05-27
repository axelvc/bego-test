import { useEffect, useState } from 'react'
import clsx from 'clsx'
import s from '../orders.module.scss'

const HOUR_IN_MS = 1000 * 60 * 60
const MINUTE_IN_MS = 1000 * 60
const SECOND_IN_MS = 1000

interface Props {
  status: number
  dateTime: number
}

export default function PickUp({ status, dateTime }: Props) {
  const date = new Date(dateTime)
  const hasPickup = status !== 1
  const [remainingTime, setRemainingTime] = useState(date.getTime() - Date.now())

  // update timer
  useEffect(() => {
    const remainingTime = date.getTime() - Date.now()

    setRemainingTime(remainingTime)

    if (!hasPickup || remainingTime < 0) {
      return
    }

    const id = setInterval(() => {
      setRemainingTime(date.getTime() - Date.now())
    }, SECOND_IN_MS)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, dateTime])

  if (!hasPickup) return null

  if (remainingTime < 0) {
    return <button className={s.order__pickup_button}>It's time for pickup</button>
  }

  const time = date.getTime() - Date.now()
  const hours = Math.floor(time / HOUR_IN_MS)
  const minutes = String(Math.floor((time % HOUR_IN_MS) / MINUTE_IN_MS)).padStart(2, '0')
  const seconds = String(Math.floor((time % MINUTE_IN_MS) / SECOND_IN_MS)).padStart(2, '0')

  return (
    <div className={clsx('centered-flex', s.order__pickup)}>
      Start pickup in&nbsp;
      <time dateTime={date.toISOString()} className={s.order__pickup_time}>
        {hours}:{minutes}:{seconds}
      </time>
    </div>
  )
}
