import styles from './SetupScreen.module.scss'
import React, { useCallback, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import Button from '../Button'
import * as Yup from 'yup'
import { motion, useAnimation } from 'framer-motion'

function Introduction({ nextStep }) {
  return (
    <div className={styles.introduction}>
      <h1 className={styles.introductionTitle}>Welcome to LoopyOS!</h1>
      <p className={styles.introductionText}>Let&apos;s get started!</p>

      <Button onClick={nextStep}>Setup</Button>
    </div>
  )
}

const CreateUserSchema = Yup.object({
  username: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),

  password: Yup.string().min(8, 'Too Short!').required('Required'),
})

function CreateUser({ setValues, nextStep }) {
  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      onSubmit={values => {
        setValues(prev => ({ ...prev, ...values }))
        nextStep()
      }}
      validationSchema={CreateUserSchema}
    >
      <Form className={styles.form}>
        <h1 className={styles.formTitle}>Create an account</h1>

        <label>
          <div>Username</div>
          <Field type="text" name="username" />
          <ErrorMessage
            name="username"
            className={styles.error}
            component="div"
          />
        </label>

        <label>
          <div>Password</div>
          <Field type="password" name="password" />
          <ErrorMessage
            name="password"
            className={styles.error}
            component="div"
          />
        </label>

        <div>
          <Button type="submit" className={styles.button}>
            Next
          </Button>
        </div>
      </Form>
    </Formik>
  )
}

function Complete({ values, setState }) {
  const handleClick = useCallback(function handleClick() {
    const users = JSON.parse(localStorage.getItem('users') ?? '[]')

    const user = {
      username: values.username,
      password: values.password,
    }

    localStorage.setItem('users', JSON.stringify([...users, user]))

    setState(null)
  }, [])

  useEffect(() => handleClick(), [handleClick])

  return null

  return (
    <div className={styles.complete}>
      <h1 className={styles.completeTitle}>Setup Finished</h1>
      <p className={styles.completeText}>Let&apos;s start!</p>

      <Button onClick={handleClick}>Start</Button>
    </div>
  )
}

export default function SetupScreen({ setState }) {
  const [step, setStep] = React.useState(0)
  const [values, setValues] = React.useState({})
  const controls = useAnimation()

  const steps = [CreateUser, Complete]

  const Step = steps[step]

  React.useEffect(() => {
    controls.start({
      opacity: 1,
    })
  }, [controls])

  return (
    <div className={styles.container}>
      <motion.div className={styles.root}>
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={controls}
        >
          <Step
            nextStep={async () => {
              await controls.start({ opacity: 0 })
              setStep(step => step + 1)
              await controls.start({ opacity: 1 })
            }}
            setValues={setValues}
            setState={setState}
            values={values}
          />
        </motion.div>
      </motion.div>
    </div>
  )
}
