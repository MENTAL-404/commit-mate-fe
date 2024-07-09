import React from 'react'
import styles from '../../../styles/ComemonGo.module.css'
import Comemons from './Comemons'

export default function ComemonGo() {
  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <img src="/images/comemon/logo.png" alt="Logo" className={styles.logo} />
      </div>
      <div className={styles.comemonsContainer}>
        <Comemons />
        <Comemons />
        <Comemons />
        <Comemons />
        <Comemons />
      </div>
    </div>
  )
}
