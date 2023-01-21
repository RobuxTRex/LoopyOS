import React, { useEffect, useMemo, useState } from 'react'
import styles from './StartScreen.module.scss'
import { format } from 'date-fns'
import { AnimatePresence, motion } from 'framer-motion'
import OSError from '../../util/OSError'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'

const MINUTE = 60 * 1000

export default function StartScreen({ setState }) {
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
  }, [time])

  return (
    <div
      className={styles.container}
      onClick={() => {
        setIsOpen(true)
      }}
    >
      <div>
        <div className={styles.time}>{format(time, 'HH:mm')}</div>
        <div className={styles.date}>{format(time, 'dd MMMM yyyy')}</div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="overlay"
            className={styles.overlay}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={{
              hidden: {
                opacity: 0,
                transition: {
                  when: 'afterChildren',
                },
              },
              visible: {
                opacity: 1,
                transition: {
                  when: 'beforeChildren',
                },
              },
            }}
            onClick={e => {
              setIsOpen(false)
              e.stopPropagation()
            }}
          >
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                },
                visible: {
                  opacity: 1,
                },
              }}
              className={styles.login}
              onClick={e => {
                e.stopPropagation()
              }}
            >
              <div className={styles.avatar}></div>

              <div className={styles.username}>{user.username}</div>

              <Formik
                initialValues={{ password: '' }}
                validationSchema={Yup.object({
                  password: Yup.string().required('Required'),
                })}
                onSubmit={(values, helpers) => {
                  if (values.password !== user.password) {
                    return helpers.setErrors({ password: 'Incorrect Password' })
                  }

                  setState('desktop')
                }}
              >
                {({ errors, touched }) => (
                  <Form>
                    <div className={styles.loginForm}>
                      <Field
                        placeholder="Password"
                        type="password"
                        name="password"
                      />
                      <button className={styles.loginButton} type="submit">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                    <div>
                      {touched.password && errors.password && (
                        <div className={styles.error}>{errors.password}</div>
                      )}
                    </div>
                  </Form>
                )}
              </Formik>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
