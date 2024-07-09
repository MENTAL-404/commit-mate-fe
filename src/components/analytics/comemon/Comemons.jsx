import React from 'react'
import styles from '../../../styles/ComemonGo.module.css'

export default function Comemons({ name, level, commitCount }) {
  const getComemonImage = (commitCount) => {
    if (commitCount <= 20) {
      return "../../../images/comemon/1.png";
    } else if (commitCount <= 40) {
      return "../../../images/comemon/2.png";
    } else if (commitCount <= 60) {
      return "../../../images/comemon/3.png";
    } else if (commitCount <= 80) {
      return "../../../images/comemon/4.png";
    } else if (commitCount <= 100) {
      return "../../../images/comemon/5.png";
    } else if (commitCount <= 120) {
      return "../../../images/comemon/6.png";
    }
  }

  return (
    <div className={styles.itemContainer}>
      <div className={styles.comemonContainer}>
        <img src={getComemonImage(commitCount)} alt="Comemon" className={styles.comemon} />
      </div>
      <div className={styles.nameBox}>
        <div className={styles.comemonName}>
          {name}
        </div>
        <div className={styles.comemonLv}>{level}</div>
      </div>
    </div>
  )
}
