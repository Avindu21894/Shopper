import React from 'react'
import { Hero } from '../components/hero/hero'
import { Popular } from '../components/popular/popular'
import { Offers } from '../components/offers/offers'
import { NewCollections } from '../components/newCollection/newCollections'

export const ShopHome = () => {
  return (
    <div>
      <Hero/>
      <Popular/>
      <Offers/>
      <NewCollections/>
    </div>
  )
}
