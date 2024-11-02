'use client'

import React from 'react'

import styles from './styles.module.scss'

const ScrollToTopButton = () => (
  <button
    onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
    className={styles.scroll}
    aria-label="scroll to top"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="15" viewBox="0 0 12 15" fill="none">
      <path
        d="M1.08301 6.90918L5.99976 1.99255"
        stroke="#19AF5B"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="square"
      />
      <path
        d="M5.99951 1.99256L10.9163 6.90918"
        stroke="#19AF5B"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="square"
      />
      <path
        d="M5.99951 1.99265L5.99951 14.5459"
        stroke="#19AF5B"
        strokeWidth="1.5"
        strokeMiterlimit="10"
      />
    </svg>
  </button>
)

export default ScrollToTopButton
