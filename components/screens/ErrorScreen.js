import React, { useEffect } from 'react'
import styles from './ErrorScreen.module.scss'

export default function ErrorScreen({ error }) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      window.location.reload()
    }, 30000)

    return () => clearTimeout(timeout)
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.root}>
        <h1 className={styles.title}>An error occurred</h1>
        <p className={styles.description}>
          The system will automatically restart in 30 seconds
        </p>

        <div>
          <h2 className={styles.errorTitle}>Error Information</h2>

          <ul className={styles.errorInfo}>
            <li>
              <code>code: {error.code ?? 'RUNTIME_ERROR'}</code>
            </li>

            {error.data && error.code ? (
              Object.entries(error.data).map(([key, value]) => (
                <li key={key}>
                  <code>
                    {key}: {JSON.stringify(value)}
                  </code>
                </li>
              ))
            ) : (
              <>
                <li>
                  <code>name: {error.name}</code>
                </li>
                <li>
                  <code>message: {error.message}</code>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}
