import React, { useEffect } from 'react'
import styles from './LoadingScreen.module.scss'
import { motion, useAnimation } from 'framer-motion'

export default function LoadingScreen() {
  const controls = useAnimation()

  useEffect(() => {
    let mounted = true
    const sequence = async () => {
      await controls.start({ x: 0 })
      await controls.start({ opacity: 1 })
    }

    return () => mounted = false
  }, [])

  return (
    <div className={styles.container}>
      <motion.svg viewBox="0 0 24 24" animate={useAnimation}>
        <circle cx="12" cy="12" r="10" />
      </motion.svg>
    </div>
  )
}
