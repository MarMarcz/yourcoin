import React from 'react'
import Navbar from '../app/components/Navbar'
import Coins from '../app/components/coins/Coins'


export default function Home() {
  return (
      <div className='main-container-index'>
        <Navbar />
        <Coins />
      </div>
  )
}