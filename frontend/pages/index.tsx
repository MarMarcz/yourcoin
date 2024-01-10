import React from 'react'
import Navbar from '../app/components/Navbar'
import Coins from '../app/components/coins/Coins'
import Footer from '../app/components/footer/Footer';
import { Provider } from 'react-redux';
// import { store } from '../store/store';
import { footerStore } from '../app/components/footer/footerStore';
import store from './../app/components/footer/store';




export default function Home({ initialFooterText }: { initialFooterText: string }) {
  return (
    <Provider store={store}>
      <div className='main-container-index'>
        <Navbar />
        <Coins />
        <Footer initialFooterText={initialFooterText} />
      </div>
    </Provider>
  )
}

Home.getInitialProps = async () => {
  const initialFooterText = 'It is magic footer!';
  return { initialFooterText };
};