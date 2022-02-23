import { motion } from 'framer-motion'
import React, { useRef, useState, useMemo, useEffect } from 'react'
import styles from './DesktopScreen.module.scss'
import { format } from 'date-fns'

const MINUTE = 60 * 1000

export default function DesktopScreen() {
  const constraintsRef = useRef(null)
  const [time, setTime] = useState(new Date())
  const [isOpen, setIsOpen] = useState(false)

  const user = useMemo(() => {
    const raw = localStorage.getItem('users')
    if (!raw) throw new OSError('LOCALSTORAGE_NO_VALUE', { key: 'users' })
    const users = JSON.parse(raw)
    if (!users || !users.length)
      throw new OSError('LOCALSTORAGE_INVALID_DATA', {
        key: 'users',
        data: users,
      })

    return users[0]
  }, [])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setTime(new Date())
    }, MINUTE - (Date.now() % MINUTE))

    return () => clearTimeout(timeout)
  }),
    [time]

  return (
    <motion.div ref={constraintsRef} className={styles.container}>
      <motion.div
        drag
        dragMomentum={false}
        dragConstraints={constraintsRef}
        className={styles.window}
      >
        Don&apos;t drag me plz
      </motion.div>

      <div className={styles.taskBar}>
        <button className={styles.taskBarButton}>
          <img
            src="/logo.svg"
            className={styles.logo}
            alt="start button"
            width={40}
            height={40}
          />
        </button>
      </div>

      <div className={styles.startMenu}>
        <div className={styles.startFlex}>
          <div className={styles.time}>{format(time, 'HH:mm')}</div>
          <div className={styles.date}>{format(time, 'dd MMMM yyyy')}</div>
          <button className={styles.startFlexButton}></button>
        </div>
        <button>tes</button>
      </div>
    </motion.div>
  )
}
