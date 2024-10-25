import React from 'react'
import { Hero } from '../components/hero/hero'
import { Popular } from '../components/popular/popular'
import { Offers } from '../components/offers/offers'
import { NewCollections } from '../components/newCollection/newCollections'
import { NewsLetter } from '../components/news_letter/news_letter'

export const ShopHome = () => {
  return (
    <div>
      <Hero/>
      <Popular/>
      <Offers/>
      <NewCollections/>
      <NewsLetter/>
    </div>
  )
}
