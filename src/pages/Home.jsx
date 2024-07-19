import Layout from '../components/Layout'
import styles from '../styles/Home.module.css'
import BottomTag from '../components/home/BottomTag'
import React from 'react'

import ComemonGo from '../components/analytics/comemon/ComemonGo'
import IssueList from '../components/issue/IssueList'
import ActiveBarChart from '../components/analytics/ActiveBarChart'

import { useState, useEffect } from 'react'

import {
  SERVER_URL,
  ORGANIZATION,
  AUTH_HEADER,
  getSelectedRepo,
} from '../utils/static'
import totalCommitImg from '../images/totalCommit.png'
import commitKingImg from '../images/commitKing.png'
import mergePrImg from '../images/mergePr.png'

export default function Home() {
  const [commitKing, setCommitKing] = useState('')
  const [totalCommit, setTotalCommit] = useState()
  const [mergePr, setMergePr] = useState()

  useEffect(() => {
    const fetchTotalcommit = async () => {
      try {
        const response = await fetch(
          `${SERVER_URL}/organizations/${ORGANIZATION}/repositories/${getSelectedRepo()}/commits/all`,
          {
            headers: AUTH_HEADER,
          }
        )

        if (!response.ok) {
          throw new Error('Failed to fetch total commits')
        }
        const data = await response.json()
        setTotalCommit(data.data.commit_count)
      } catch (error) {
        console.error('Error fetching total commits:', error)
      }
    }

    const fetchCommitKing = async () => {
      try {
        const response = await fetch(
          `${SERVER_URL}/organizations/${ORGANIZATION}/repositories/${getSelectedRepo()}/commits/weekly/top`,
          {
            headers: AUTH_HEADER,
          }
        )

        if (!response.ok) {
          throw new Error('Failed to fetch commit king')
        }
        const data = await response.json()
        setCommitKing(data.data.nickname)
      } catch (error) {
        console.error('Error fetching commit king:', error)
      }
    }

    const fetchMergePR = async () => {
      try {
        const response = await fetch(
          `${SERVER_URL}/organizations/${ORGANIZATION}/repositories/${getSelectedRepo()}/pulls`,
          {
            headers: AUTH_HEADER,
          }
        )

        if (!response.ok) {
          throw new Error('Failed to fetch pull requests')
        }
        const data = await response.json()
        setMergePr(data?.data)
        console.log(data.data)
      } catch (error) {
        console.error('Error fetching pull requests:', error)
      }
    }

    fetchTotalcommit()
    fetchCommitKing()
    fetchMergePR()
  }, [])

  const truncateNickname = (nickname) => {
    if (Array.isArray(nickname)) {
      nickname = nickname[0]
    }
    return nickname.length > 10 ? `${nickname.substring(0, 10)}..` : nickname
  }

  return (
    <Layout>
      <div className={styles.main}>
        <div className={styles.topContainer}>
          📌 커밋메이트는 프로젝트 협업 관리 툴로, 깃허브 활동 상황을 실시간으로
          볼 수 있는 대시보드입니다.
        </div>
        <div className={styles.bottomOuterContainer}>
          <div className={styles.wordCloudContainer}>
            <ComemonGo />
          </div>
          <div className={styles.middleContainer}>
            <div className={styles.activeContainer}>
              <h1 className={styles.title}>활동차트</h1>
              <div className={styles.activeChart}>
                <ActiveBarChart />
              </div>
            </div>
            <div className={styles.issueContainer}>
              <h1 className={styles.title}>깃헙 이슈</h1>
              <div className={styles.issue}>
                <IssueList className={styles.issue} type='open' />
              </div>
            </div>
          </div>
          <div className={styles.etcContainer}>
            <h1 className={styles.title}>명예의 전당</h1>
            <div className={styles.bottomContainer}>
              <BottomTag
                image={totalCommitImg}
                bottom='총 커밋수'
                title={totalCommit}
              />
              <BottomTag
                image={commitKingImg}
                bottom='저번주 커밋왕'
                title={truncateNickname(commitKing)}
              />
              <BottomTag
                image={mergePrImg}
                bottom='Merge / PR'
                title={`${mergePr?.merge_count} / ${mergePr?.pr_count}`}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
