import React from 'react'
import { asyncComponent } from 'react-async-component'
import CastSkeleton from '../cast-skeleton'

export default asyncComponent({
  resolve: () => import(/* webpackChunkName: "season-list" */ './index'),
  LoadingComponent: () => <CastSkeleton count={4} />,
})
