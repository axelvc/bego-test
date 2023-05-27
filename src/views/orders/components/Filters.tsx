import { useEffect, useState } from 'react'
import clsx from 'clsx'
import { ReactComponent as SearchIcon } from '@/assets/search.svg'
import { Order } from '@/services/orders/orders.service'
import { useOrderState } from '@/views/orders/orders.state'
import s from '../orders.module.scss'

interface CategoryFilter {
  label: string
  filter: (order: Order) => boolean
}

const orderCategories: CategoryFilter[] = [
  { label: 'all', filter: () => true },
  { label: 'upcoming', filter: (order) => order.start_date > Date.now() },
  { label: 'completed', filter: (order) => order.end_date < Date.now() },
  { label: 'past', filter: (order) => order.end_date < Date.now() },
]

export default function Filters() {
  const [orders, setFilteredOrders] = useOrderState((s) => [s.orders, s.setFilteredOrders])
  const [searchInput, setSearchInput] = useState('')
  const [pickedCategory, setPickedCategory] = useState(0)

  useEffect(() => {
    const filterByCategory = orderCategories[pickedCategory].filter
    const filterBySearch = (order: Order) => order.order_number.toLowerCase().includes(searchInput.toLowerCase())

    const filtered = orders.filter((order: Order) => filterByCategory(order) && filterBySearch(order))

    setFilteredOrders(filtered)
  }, [orders, searchInput, pickedCategory, setFilteredOrders])

  return (
    <section>
      <div className={s.categories}>
        {orderCategories.map((category, i) => (
          <button
            key={category.label}
            type="button"
            disabled={i === pickedCategory}
            onClick={() => setPickedCategory(i)}
          >
            {category.label}
          </button>
        ))}
      </div>

      <label className={clsx('centered-flex', s.filter)}>
        <div className={clsx('centered-flex', s.filter__icon)}>
          <SearchIcon />
        </div>

        <input
          className={s.filter__input}
          type="text"
          placeholder="Search..."
          onChange={(el) => setSearchInput(el.target.value)}
        />
      </label>
    </section>
  )
}
