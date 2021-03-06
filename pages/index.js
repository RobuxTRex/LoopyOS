import Head from 'next/head'
// import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import Button from '../components/Button'
import react from 'react'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>LoopyOS - Start</title>
      </Head>

      <div>
        <h1 className={styles.title}>LoopyOS</h1>

        <Button href="/os">Start</Button>

        <p className={styles.basictext}>
          LoopyOS is an OS made for the browser. Press start to begin Setup and the OS will begin to load.
        </p>
      </div>
    </div>
  )
}
