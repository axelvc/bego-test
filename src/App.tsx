import { Route, Switch } from 'wouter'

import Orders from '@/views/orders/orders'
import Details from '@/views/details/details'

export default function App() {
  return (
    <Switch>
      <Route path="/" component={Orders} />
      <Route path="/order/:id" component={Details} />
    </Switch>
  )
}
