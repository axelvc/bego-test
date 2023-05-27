import { useEffect, useState } from 'react'
import { useRoute } from 'wouter'
import clsx from 'clsx'
import Header from '@/components/Header/Header'
import Status from '@/components/Status/Status'
import Destination from '@/components/Destination/Destination'
import DefaultProfileImage from '@/assets/default-profile-image.jpg'
import Time from '@/components/Time/Time'
import TrackInfo from './components/TrackInfo'
import { ReactComponent as TruckIcon } from '@/assets/truck-2.svg'
import { ReactComponent as AngleUpIcon } from '@/assets/angle-small-up.svg'
import { DetailedDestination, OrderDetails, getOrder } from '@/services/orders/orders.service'
import { formatDate, formatTime } from '@/utils/date'
import s from './details.module.scss'

enum DestinationType {
  Pickup = 'pickup',
  Delivery = 'dropoff',
  Unkown = '',
}

export default function Details() {
  const [details, setDetails] = useState<OrderDetails | null>(null)
  const [focusedIndex, setFocusedIndex] = useState(0)
  const [, params] = useRoute('/details/:id')

  useEffect(() => {
    getOrder(params?.id ?? '')
      .then(setDetails)
      .catch(console.error)
  }, [params?.id])

  function getDestinationType(destination: DetailedDestination): DestinationType {
    if (destination.place_id_pickup) return DestinationType.Pickup
    if (destination.place_id_dropoff) return DestinationType.Delivery

    return DestinationType.Unkown
  }

  return (
    <>
      <Header title="Cargo Details" />

      {details && (
        <>
          <section className={clsx('gradient-border', s.order)}>
            <div className={s.order__reference}>Refrenecia {details.reference_number}</div>
            <div className={s.order__number}>Order #{details.order_number}</div>

            <ol className={s.order__destinations}>
              {details.destinations.map((destination, i) => (
                <li key={destination.address} className={s.order__destination}>
                  <button type="button" className={s.order__destination__button} onClick={() => setFocusedIndex(i)} />

                  <div
                    className={clsx('centered-flex', {
                      [s.order__destination__decorator]: true,
                      [s.active]: i === focusedIndex,
                    })}
                  >
                    {i === focusedIndex && <TruckIcon />}
                  </div>

                  <div className={s.order__destination__details}>
                    <Destination address={destination.address} type={getDestinationType(destination)} />
                    <Status
                      status={destination.status_string}
                      statusClass={destination.status_class}
                      className={s.order__destination__status}
                    />
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section className={clsx('gradient-border', s.track)}>
            <div className={clsx('centered-flex', s.track__driver)}>
              {/* eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing */}
              <img src={details.driver.thumbnail || DefaultProfileImage} />
            </div>

            <Time className={s.track__time} timestamp={details.destinations[focusedIndex].startDate}>
              {formatTime(details.destinations[focusedIndex].startDate)}
            </Time>

            <TrackInfo type={getDestinationType(details.destinations[focusedIndex])} details={details} />

            <button type="button" disabled={details.status < 3}>
              Track Order
            </button>
          </section>

          <details className={s.extra}>
            <summary className="gradient-border">
              {getDestinationType(details.destinations[focusedIndex])} Data
              <AngleUpIcon className={s.extra__open_indicator} />
            </summary>

            <div>
              <p>{details.destinations[focusedIndex].address}</p>
              <br />
              <p>{formatDate(details.destinations[focusedIndex].startDate)}</p>
              <br />
              <p>{details.destinations[focusedIndex].contact_info.telephone}</p>
              <br />
              <p>{details.destinations[focusedIndex].contact_info.email}</p>
            </div>
          </details>
        </>
      )}
    </>
  )
}
