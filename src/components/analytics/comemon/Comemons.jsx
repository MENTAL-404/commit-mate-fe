import React from 'react'
import styles from '../../../styles/ComemonGo.module.css'

export default function Comemons({ name, level, commitCount }) {

  const getComemonImage = (commitCount) => {
    if (commitCount <= 25) {
      return "../../../images/comemon/1.png";
    } else if (commitCount <= 50) {
      return "../../../images/comemon/2.png";
    } else if (commitCount <= 75) {
      return "../../../images/comemon/3.png";
    } else if (commitCount <= 100) {
      return "../../../images/comemon/4.png";
    } else if (commitCount <= 125) {
      return "../../../images/comemon/5.png";
    } else if (commitCount <= 150) {
      return "../../../images/comemon/6.png";
    } else if (commitCount <= 180) {
      return "../../../images/comemon/7.png";
    } return  "../../../images/comemon/8.png";
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
