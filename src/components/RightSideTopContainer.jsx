import React, { useEffect, useState } from 'react'
import styles from '../styles/RightSideTopContainer.module.css'
import noti from '../images/noti.png'
import drop from '../images/drop.png'

import {
  getSelectedRepo,
  SERVER_URL,
  AUTH_HEADER,
} from '../utils/static'


export default function RightSideTopContainer({ customStyle }) {
  const [data, setData] = useState([]);
  const selectedRepo = getSelectedRepo();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/organizations`, {
          headers: AUTH_HEADER,
        });
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        setData(result.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [selectedRepo]);

  return (
    <>
      <div
        className={`${styles.topContainer} ${customStyle ? styles[customStyle] : ''}`}
      >
        <div className={styles.notiContainer}>
          <img src={noti} alt='notification' className={styles.notiIcon} />
        </div>
        <div className={styles.profileContainer}>
          <div className={styles.innerContainer}>
            <img
              src={data.avatar_url}
              alt='profile'
              className={styles.profileImage}
            />
            <div className={styles.organizationName}>{selectedRepo}</div>
          </div>
          <img src={drop} alt='drop' className={styles.dropImage} />
        </div>
      </div>
    </>
  )
}
