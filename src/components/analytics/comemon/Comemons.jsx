import React from 'react'
import styles from '../../../styles/ComemonGo.module.css'
import commemon1 from '../../../assets/images/comemon/1.png'
import commemon2 from '../../../assets/images/comemon/2.png'
import commemon3 from '../../../assets/images/comemon/3.png'
import commemon4 from '../../../assets/images/comemon/4.png'
import commemon5 from '../../../assets/images/comemon/5.png'
import commemon6 from '../../../assets/images/comemon/6.png'
import commemon7 from '../../../assets/images/comemon/7.png'
import commemon8 from '../../../assets/images/comemon/8.png'

export default function Comemons({ name, level, commitCount }) {
  const getComemonImage = (commitCount) => {
    if (commitCount <= 25) {
      return commemon1
    } else if (commitCount <= 50) {
      return commemon2
    } else if (commitCount <= 75) {
      return commemon3
    } else if (commitCount <= 100) {
      return commemon4
    } else if (commitCount <= 125) {
      return commemon5
    } else if (commitCount <= 150) {
      return commemon6
    } else if (commitCount <= 180) {
      return commemon7
    }
    return commemon8
  }

  return (
    <div className={styles.itemContainer}>
      <div className={styles.comemonContainer}>
        <img
          src={getComemonImage(commitCount)}
          alt='Comemon'
          className={styles.comemon}
        />
      </div>
      <div className={styles.nameBox}>
        <div className={styles.comemonName}>{name}</div>
        <div className={styles.comemonLv}>{level}</div>
      </div>
    </div>
  )
}
