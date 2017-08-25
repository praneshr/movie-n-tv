import React from 'react'
import { asyncComponent } from 'react-async-component'
import Skeleton from '../image-grid-skeleton'

export default asyncComponent({
  resolve: () => import(/* webpackChunkName: "image-grid" */ './index'),
  LoadingComponent: () => <Skeleton count={4} />,
})
