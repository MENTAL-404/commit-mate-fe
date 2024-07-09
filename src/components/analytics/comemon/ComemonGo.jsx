import React, { useEffect, useState } from 'react';
import styles from '../../../styles/ComemonGo.module.css'
import Comemons from './Comemons'

import {
  getSelectedRepo,
  SERVER_URL,
  ORGANIZATION,
  AUTH_HEADER,
} from '../../../utils/static'

// const data = [
//   { "nickname": "hong", "commit_count": 2 },
//   // { "nickname": "ian", "commit_count": 80 },
//   { "nickname": "silvia", "commit_count": 30 },
//   // { "nickname": "jun", "commit_count": 200 },
//   // { "nickname": "erica", "commit_count": 70 }
// ];

export default function ComemonGo() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/organizations/${ORGANIZATION}/repositories/${getSelectedRepo()}/commits/rank`, {
          headers: AUTH_HEADER,
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const result = await response.json();
        setData(result.data); // 데이터 형식에 맞게 수정하세요
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const truncateNickname = (nickname) => {
    return nickname.length > 8 ? `${nickname.substring(0, 6)}..` : nickname;
  };


  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <div className={styles.emptyBox}></div>
        <img src="/images/comemon/logo.png" alt="Logo" className={styles.logo} />
      </div>
      <div className={styles.comemonsContainer}>
        {data.map((item, index) => (
          <Comemons
            key={index}
            name={truncateNickname(item.nickname)}
            level={`Lv. ${item.commit_count}`}
            commitCount={item.commit_count}
          />
        ))}
      </div>
    </div>
  )
}
