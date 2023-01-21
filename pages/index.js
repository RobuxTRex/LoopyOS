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
          LoopyOS is a Work in Progress Operating System made for the Web Browser.   Ensure you do not zoom out, as it may break functionality severely.
        </p>
      </div>
    </div>
  )
}
