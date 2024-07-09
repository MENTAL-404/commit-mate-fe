import React, { useEffect, useState, useRef } from 'react'
import styles from '../../styles/WordCloud.module.css'
import ReactWordcloud from 'react-wordcloud'
import {
  getSelectedRepo,
  SERVER_URL,
  ORGANIZATION,
  AUTH_HEADER,
} from '../../utils/static'
import Lottie from 'lottie-react'
import loadingIndicator from '../../images/loading.json'

import 'tippy.js/dist/tippy.css'
import 'tippy.js/animations/scale.css'

const callbacks = {
  getWordTooltip: (word) => `${word.text} (${word.value})`,
}

// 글씨체와 색깔 옵션 설정
const options = {
  // fontFamily: 'Wanted Sans Variable, sans-serif',
  fontFamily: 'WavvePADO-Regular, sans-serif',
  colors: ['#30A14E', '#40C463', '#216E39', '#eb763c'], // 원하는 색상 배열
  fontSizes: [10, 50], // 글씨 크기 범위 설정 (최대 값을 줄임)
  rotations: 1, // 회전할 각도 수 (줄임)
  rotationAngles: [0], // 회전 각도 범위 (0으로 제한)
}

export default function MyWordcloud() {
  const [commitMessages, setCommitMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const containerRef = useRef(null)

  const updateDimensions = () => {
    if (containerRef.current) {
      setDimensions({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
      })
    }
  }

  useEffect(() => {
    setLoading(true)
    const fetchCommitMessages = async () => {
      try {
        const response = await fetch(
          `${SERVER_URL}/organizations/${ORGANIZATION}/repositories/${getSelectedRepo()}/commits/wordcloud`,
          {
            headers: AUTH_HEADER,
          }
        )

        if (!response.ok) {
          throw new Error('Failed to fetch access token')
        }
        const data = await response.json()
        setCommitMessages(data)
      } catch (error) {
        console.error('Error fetching repositories:', error)
      }
      setLoading(false)
    }

    fetchCommitMessages()

    // Initialize dimensions on mount
    updateDimensions()

    window.addEventListener('resize', updateDimensions)

    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  // 메시지의 빈도를 계산하여 words 배열 생성
  const messageFrequency = commitMessages?.data?.reduce((acc, item) => {
    const words = item.message.split(' ')
    words.forEach((word) => {
      acc[word] = (acc[word] || 0) + 1
    })
    return acc
  }, {})

  const words = messageFrequency
    ? Object.keys(messageFrequency).map((word) => ({
        text: word,
        value: messageFrequency[word],
      }))
    : []

  return loading ? (
    <Lottie animationData={loadingIndicator} />
  ) : (
    <div ref={containerRef} className={styles.wordCloud}>
      <ReactWordcloud
        callbacks={callbacks}
        words={words}
        options={options}
        size={[dimensions.width, dimensions.height]} // 크기를 동적으로 설정
      />
    </div>
  )
}
