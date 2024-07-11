import Lottie from 'lottie-react'
import loadingIndicator from '../images/loading 5.json'
import styles from '../../src/styles/Loading.module.css'
import React from 'react'

export default function LoadingLottie({ width }) {
  return (
    <div className={styles.loadingContainer} style={{ width: `${width}` }}>
      <Lottie animationData={loadingIndicator} />
    </div>
  )
}
