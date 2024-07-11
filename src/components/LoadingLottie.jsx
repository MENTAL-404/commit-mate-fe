import Lottie from 'lottie-react'
import loadingIndicator from '../images/loading 5.json'
import styles from '../../src/styles/Loading.module.css'
import React from 'react'

export default function LoadingLottie() {
  return (
    <div className={styles.loadingContainer}>
      <Lottie animationData={loadingIndicator} />
    </div>
  )
}
