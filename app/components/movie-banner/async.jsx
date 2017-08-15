import React from 'react'
import { asyncComponent } from 'react-async-component'
import Skeleton from '../banner-skeleton'

export default asyncComponent({
  resolve: () => import(/* webpackChunkName: "movie-banner" */ './index'),
  LoadingComponent: () => <Skeleton />,
})
