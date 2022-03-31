import { motion } from 'framer-motion'
import React, { useRef, useState, useMemo, useEffect } from 'react'
import styles from './DesktopScreen.module.scss'
import { format } from 'date-fns'
import useWindowSize from 'react-use/lib/useWindowSize'

const MINUTE = 60 * 1000

export default function DesktopScreen() {
  const constraintsRef = useRef(null)
  const [time, setTime] = useState(new Date())
  const [isOpen, setIsOpen] = useState(false)
  const windowSize = useWindowSize()

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

  console.log(windowSize.width)

  return (
    <motion.div className={styles.container}>
      <motion.div ref={constraintsRef} className={styles.windowConstraints}>
        {' '}
        <motion.div
          drag
          dragMomentum={false}
          dragConstraints={constraintsRef}
          className={styles.window}
        >
          Don&apos;t drag me plz
        </motion.div>
      </motion.div>

      <div className={styles.taskBar}>
        <button className={styles.taskBarButton}>
          <img
            src="/LoopyOS/logo.svg"
            className={styles.logo}
            alt="start button"
            width={40}
            height={40}
          />
        </button>

        <div className={styles.flexGrow} />

        <div className={styles.time}>
          <div>{format(time, 'HH:mm')}</div>
          <div>{format(time, 'dd/MM/yyyy')}</div>
        </div>
      </div>

      <div className={styles.startMenu}>
        <div className={styles.startMenuUpper}>
          <ul>
            <li className={styles.startTextUpper}>{user.username}</li>
          </ul>
        </div>
      </div>
    </motion.div>
  )
}
