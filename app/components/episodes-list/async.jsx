import React from 'react'
import { asyncComponent } from 'react-async-component'
import DetailsSkeleton from '../episodes-list-skeleton'

export default asyncComponent({
  resolve: () => import(/* webpackChunkName: "episodes-list" */ './index'),
  LoadingComponent: () => <DetailsSkeleton count={5} />,
})
