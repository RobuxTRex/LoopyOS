import styles from './SetupScreen.module.scss'
import React from 'react'
import Button from '../Button'

export default function SetupScreen() {
  return (
      <>
      <div className={styles.titlecontainer}>
          <h1 className={styles.title}>LoopyOS</h1>
          <h1 className={styles.subtitle}>Setup</h1>
      </div>
      <div className={styles.container}>
        <h1 className={styles.subatitle}>User Profile</h1><input></input>

        <Button href="">Create User Profile</Button>
        
      </div>
      </> 
  )
}