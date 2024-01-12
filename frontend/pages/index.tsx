import React from 'react'
import Navbar from '../app/components/Navbar'
import Coins from '../app/components/coins/Coins'
import Footer from '../app/components/footer/Footer';
import { Provider } from 'react-redux';
import store from './../app/components/footer/store';


export default function Home() {
  return (
    <Provider store={store}>
      <div className='main-container-index'>
        <Navbar />
        <Coins />
        <Footer initialFooterText={"Its Magic Footer"} />
      </div>
    </Provider>
  )
}

