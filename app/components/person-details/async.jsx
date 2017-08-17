import React from 'react'
import { asyncComponent } from 'react-async-component'
import Skeleton from '../person-details-skeleton'

export default asyncComponent({
  resolve: () => import(/* webpackChunkName: "person-details" */ './index'),
  LoadingComponent: () => <Skeleton />,
})
