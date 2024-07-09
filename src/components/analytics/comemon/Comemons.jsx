import React from 'react'
import styles from '../../../styles/ComemonGo.module.css'

export default function Comemons() {
  return (
    <div className={styles.itemContainer}>
      <div className={styles.comemonContainer}>
        <img src="/images/comemon/6.png" alt="Comemon" className={styles.comemon} />
      </div>
      <div className={styles.nameBox}>
        <div className={styles.comemonName}>
          erica
        </div>
        <div className={styles.comemonLv}>Lv. 25</div>
      </div>
    </div>
  )
}
