import React from 'react'
import { Hero } from '../components/hero/hero'
import { Popular } from '../components/popular/popular'
import { Offers } from '../components/offers/offers'

export const ShopHome = () => {
  return (
    <div>
      <Hero/>
      <Popular/>
      <Offers/>
    </div>
  )
}
