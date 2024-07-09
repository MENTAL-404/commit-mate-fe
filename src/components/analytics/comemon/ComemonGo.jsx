import React from 'react'
import styles from '../../../styles/ComemonGo.module.css'
import Comemons from './Comemons'

const data = [
  { "nickname": "hong", "commit_count": 2 },
  { "nickname": "ian", "commit_count": 80 },
  { "nickname": "silvia", "commit_count": 30 },
  { "nickname": "jun", "commit_count": 200 },
  { "nickname": "erica", "commit_count": 70 }
];

export default function ComemonGo() {
  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <img src="/images/comemon/logo.png" alt="Logo" className={styles.logo} />
      </div>
      <div className={styles.comemonsContainer}>
        {data.map((item, index) => (
          <Comemons key={index} name={item.nickname} level={`Lv. ${item.commit_count}`} commitCount={item.commit_count} />
        ))}
      </div>
    </div>
  )
}
