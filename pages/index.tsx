import type { NextPage } from 'next'
import Reac, {useState, useEffect} from 'react';
import Head from 'next/head'
import styles from '../styles/Home.module.scss';
import PhotoOfTheDay from '../components/DetailProduct';
import ProductsList from '../components/ProductsList'
import Header from '../components/Header'


const Home: NextPage = () => {

  return (
    <div className={styles.container}>
      <Head>
        <title>Bejamas</title>
        <meta name="description" content="E-commerce where you can buy your favorite photos!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
          <Header/>
          <PhotoOfTheDay/>
          <ProductsList/>
      </main>

    </div>
  )
}

export default Home
