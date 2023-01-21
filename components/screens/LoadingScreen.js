import React, { useEffect } from 'react'
import styles from './LoadingScreen.module.scss'
import { motion, useAnimation } from 'framer-motion'

export default function LoadingScreen({ setState }) {
  const controls = useAnimation()

  useEffect(() => {
    const timeout = setTimeout(async () => {
      await controls.start({ opacity: 0, transition: { duration: 1.5 } })

      const users = localStorage.getItem('users')
      if (!users) {
        return setState('setup')
      }

      setState('start')
    }, 4000)

    return () => clearTimeout(timeout)
  }, [controls, setState])

  return (
    <motion.div className={styles.container} animate={controls}>
      <svg viewBox="0 0 24 24" className={styles.svg}>
        <motion.circle
          cx="12"
          cy="12"
          r="11"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          animate={{
            scale: [0, 1],
            opacity: [1, 1, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 1.2,
          }}
          initial={{
            scale: 0,
          }}
        />
      </svg>
    </motion.div>
  )
}
