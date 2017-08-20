import React from 'react'
import { asyncComponent } from 'react-async-component'
import DetailsSkeleton from '../season-details-skeleton'

export default asyncComponent({
  resolve: () => import(/* webpackChunkName: "season-details" */ './index'),
  LoadingComponent: () => <DetailsSkeleton />,
})
