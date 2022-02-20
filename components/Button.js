import React from 'react'
import styles from './Button.module.scss'
import clsx from 'clsx'
import Link from 'next/link'

export default function Button({ as, className, ...props }) {
  const Component =
    as ??
    (props.href
      ? ({ href, ...props }) => (
          <Link href={href}>
            <a {...props} />
          </Link>
        )
      : 'button')

  return <Component className={clsx(styles.button, className)} {...props} />
}
