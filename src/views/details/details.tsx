import { useEffect, useState } from 'react'
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
import * as s from './details.module.scss'
import clsx from 'clsx'

enum DestinationType {
  Pickup = 'pickup',
  Delivery = 'dropoff',
  Unkown = '',
}

export default function Details() {
  const [details, setDetails] = useState<OrderDetails>({} as unknown as OrderDetails)
  const [pickedDestination, setPickedDestination] = useState<DetailedDestination | null>(null)

  useEffect(() => {
    getOrder('').then(setDetails).catch(console.error)
  }, [])

  function getDestinationType(destination: DetailedDestination): DestinationType {
    if (destination.place_id_pickup) return DestinationType.Pickup
    if (destination.place_id_dropoff) return DestinationType.Delivery

    return DestinationType.Unkown
  }

  return (
    <>
      <Header title="Cargo Details" />
      <section className={s.order}>
        <div className={s.order__reference}>Refrenecia {details.reference_number}</div>
        <div className={s.order__number}>Order: #{details.order_number}</div>

        <ol className={s.order__destinations}>
          {details.destinations?.map((destination) => (
            <li key={destination.address} className={s.order__destination}>
              <button
                type="button"
                className={s.order__destination__button}
                onClick={() => setPickedDestination(destination)}
              />

              <div className={clsx('centered-flex', s.order__destination__decorator)}>
                <TruckIcon />
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
      <section className={s.track}>
        <div className={clsx('centered-flex', s.track__driver)}>
          {/* eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing */}
          <img src={details?.driver?.thumbnail || DefaultProfileImage} />
        </div>

        <Time className={s.track__time} timestamp={pickedDestination?.startDate ?? 0}>
          {formatTime(pickedDestination?.startDate ?? 0)}
        </Time>

        {pickedDestination && <TrackInfo type={getDestinationType(pickedDestination)} details={details} />}

        <button type="button" disabled={details.status < 3}>
          Track Order
        </button>
      </section>

      <details className={s.extra}>
        <summary>
          {getDestinationType(pickedDestination ?? ({} as unknown as DetailedDestination))} Data
          <AngleUpIcon className={s.extra__open_indicator} />
        </summary>

        {pickedDestination
          ? (
            <div>
              <p>{pickedDestination.address}</p>
              <br />
              <p>{formatDate(pickedDestination.startDate)}</p>
              <br />
              <p>{pickedDestination.contact_info.telephone}</p>
              <br />
              <p>{pickedDestination.contact_info.email}</p>
            </div>
            )
          : (
            <p>Por favor selecciona un destino primero</p>
            )}
      </details>
    </>
  )
}
