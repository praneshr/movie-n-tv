import React from 'react'
import { asyncComponent } from 'react-async-component'
import DetailsSkeleton from '../details-skeleton'

export default asyncComponent({
  resolve: () => import(/* webpackChunkName: "details" */ './index'),
  LoadingComponent: () => <DetailsSkeleton />,
})
