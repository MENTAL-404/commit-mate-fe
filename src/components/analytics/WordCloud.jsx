import React, { useEffect, useState, useRef } from 'react'
import styles from '../../styles/WordCloud.module.css'
import ReactWordcloud from 'react-wordcloud'
import { API_URL } from '../../utils/static'
import useFetchData from '../../hooks/useFetchData'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/animations/scale.css'
import LoadingLottie from '../LoadingLottie'

const callbacks = {
  getWordTooltip: (word) => `${word.text} (${word.value})`,
}

// 글씨체와 색깔 옵션 설정
const options = {
  fontFamily: 'WavvePADO-Regular, sans-serif',
  colors: ['#30A14E', '#40C463', '#216E39'], // 원하는 색상 배열
  fontSizes: [10, 43], // 글씨 크기 범위 설정 (최대 값을 줄임)
  rotations: 1, // 회전할 각도 수 (줄임)
  rotationAngles: [0], // 회전 각도 범위 (0으로 제한)
}

export default function MyWordcloud() {
  const { loading, response, error } = useFetchData(API_URL().commit_message)
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
    // Initialize dimensions on mount
    updateDimensions()

    window.addEventListener('resize', updateDimensions)

    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  if (loading) {
    return <LoadingLottie width={'50px'} />
  }

  if (error) {
    return <div>Error fetching data</div>
  }

  const commitMessages = response ? response.data : []

  // 메시지의 빈도를 계산하여 words 배열 생성
  const messageFrequency = commitMessages?.reduce((acc, item) => {
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

  return (
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
