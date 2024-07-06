import React from 'react'
import ReactWordcloud from 'react-wordcloud'
import { wordCloud } from '../../data/homeData'

import 'tippy.js/dist/tippy.css'
import 'tippy.js/animations/scale.css'

// 메시지의 빈도를 계산하여 words 배열 생성
const messageFrequency = wordCloud.data.reduce((acc, item) => {
  const words = item.message.split(' ')
  words.forEach((word) => {
    acc[word] = (acc[word] || 0) + 1
  })
  return acc
}, {})

const words = Object.keys(messageFrequency).map((word) => ({
  text: word,
  value: messageFrequency[word],
}))

const callbacks = {
  getWordTooltip: (word) => `${word.text} (${word.value})`,
}

// 글씨체와 색깔 옵션 설정
const options = {
  fontFamily: 'Wanted Sans Variable, sans-serif', // 원하는 글씨체로 변경
  colors: ['#30A14E', '#40C463', '#216E39', '#eb763c'], // 원하는 색상 배열
  fontSizes: [15, 60], // 글씨 크기 범위 설정
  rotations: 2, // 회전할 각도 수
  rotationAngles: [-90, 0], // 회전 각도 범위
}

export default function MyWordcloud() {
  return (
    <ReactWordcloud callbacks={callbacks} words={words} options={options} />
  )
}
