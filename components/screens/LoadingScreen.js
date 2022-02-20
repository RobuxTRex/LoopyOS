import React, { useEffect } from "react";
import styles from "./LoadingScreen.module.scss";
import { motion } from "framer-motion";

export default function LoadingScreen({ setState }) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      const users = window.localStorage.getItem('users') ?? []

      if (users.length === 0) {
        return setState('setup')
      }
    }, 5000)

    return () => clearTimeout(timeout)
  }, [])

  return (
    <div className={styles.container}>
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
    </div>
  );
}
