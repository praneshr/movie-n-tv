import React from 'react'
import { asyncComponent } from 'react-async-component'
import CardSkeleton from '../card-skeleton'

export default asyncComponent({
  resolve: () => import(/* webpackChunkName: "movie-card" */ './index'),
  LoadingComponent: ({ type }) => {
    return <div style={{
      clear: 'both',
      marginLeft: -15,
      marginRight: -15,
    }}>
      {
        new Array(20).fill(undefined).map((el, i) => <CardSkeleton key={i} type={type} />)
      }
    </div>
  }
})
