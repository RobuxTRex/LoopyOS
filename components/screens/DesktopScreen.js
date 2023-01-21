import { motion } from 'framer-motion'
import React, { useRef, useState, useMemo, useEffect } from 'react'
import styles from './DesktopScreen.module.scss'
import { format } from 'date-fns'
import useWindowSize from 'react-use/lib/useWindowSize'

import { TrashIcon, GlobeAltIcon } from '@heroicons/react/24/solid'

import applicationBar from '../applicationBar'

const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const MINUTE = 60 * 1000
const SECOND = 60 * MINUTE

const TIME = new Date()
let currentDay = weekdays[TIME.getDay()]
let currentMonth = months[TIME.getMonth()]
let currentDayMonth = TIME.getDate()
let currentYear = TIME.getFullYear()

export default function DesktopScreen() {
  const constraintsRef = useRef(null)
  const [time, setTime] = useState(new Date())
  const [isOpen, setIsOpen] = useState(false)
  const [startOpen, setStartOpen] = useState(false)
  const [timeOpen, setTimeOpen] = useState(false)
  const [trashOpen, setTrashOpen] = useState(false)
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
    }, MINUTE - (Date.now() % SECOND))

    return () => clearTimeout(timeout)
  }),
    [time]

  console.log(windowSize.width)

  function startButtonClicked() {
    const start = document.getElementById("start")
    if (!trashOpen) {
      start.style.display = "flex"
      setTrashOpen(true)
    } else {
      start.style.display = "none"
      setTrashOpen(false)
    }
  }

  function trashButtonClicked() {
    const start = document.getElementById("trash")
    if (!startOpen) {
      start.style.display = "flex"
      setStartOpen(true)
    } else {
      start.style.display = "none"
      setStartOpen(false)
    }
  }

  function timeButtonClicked() {
    const menu = document.getElementById("timeMenu")
    if (!timeOpen) {
      menu.style.display = "flex"
      setTimeOpen(true)
    } else {
      menu.style.display = "none"
      setTimeOpen(false)
    }
  }

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

      <div className={styles.taskBar} onContextMenu={(e) => {
        e.preventDefault()
      }}>

        <button className={styles.taskBarButton} onClick={startButtonClicked}>
          <img
            src="/Logo.svg"
            className={styles.logo}
            alt="start button"
            width={40}
            height={40}
          />
        </button>
        <div className={styles.flexGrow} />

        <button className={styles.timeButton} onClick={timeButtonClicked}>
          <div className={styles.time}>
            <div>{format(time, 'HH:mm')}</div>
            <div>{format(time, 'dd/MM/yyy')}</div>
          </div>
        </button>
      </div>

      <div className={styles.startMenu} id="start">
        <div className={styles.startMenuUpper}>
          <ul>
            <li className={styles.startTextUpper}>Welcome back, {user.username}</li>
            <li className={styles.startMenuUpperB}>Suggested Applications...</li>
          </ul>
        </div>
      </div>
      <div className={styles.startMenu} id="trash">
        <applicationBar />
        <div className={styles.startMenuUpper}>
          <ul>
            <li className={styles.trashText}>Currently, there is no trash in the Trash Can. Come back later, or add to the can by Right-Clicking an item.</li>
          </ul>
        </div>
      </div>
      <div className={styles.timeMenu} id="timeMenu">
        <div className={styles.startMenuUpper}>
          <ul>
            <p className={styles.timeMenuUpper}>{format(time, 'HH:mm:ss')}</p>
            <p className={styles.timeMenuWeek}>{currentDay}, {currentDayMonth} {currentMonth} {currentYear} </p>
          </ul>
        </div>
      </div>

      <button className={styles.taskBarButton} onClick={startButtonClicked}>
          <img
            src="/loopysurf.svg"
            className={styles.logo}
            alt="LoopySurf Icon"
            width={128}
            height={128}
          />
          <span>LoopySurf Web Browser</span>
        </button>
    </motion.div>
  )
}
