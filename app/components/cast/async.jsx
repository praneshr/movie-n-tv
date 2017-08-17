import React from 'react'
import { asyncComponent } from 'react-async-component'
import Skeleton from '../cast-skeleton'

export default asyncComponent({
  resolve: () => import(/* webpackChunkName: "cast" */ './index'),
  LoadingComponent: () => <Skeleton count={7} />,
})
