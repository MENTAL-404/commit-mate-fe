import React from 'react'
import ReactWordcloud from 'react-wordcloud'
import { wordCloud } from '../../data/homeData'

import 'tippy.js/dist/tippy.css'
import 'tippy.js/animations/scale.css'

// 메시지의 빈도를 계산하여 words 배열 생성
const messageFrequency = wordCloud.data.reduce((acc, item) => {
  acc[item.message] = (acc[item.message] || 0) + 1
  return acc
}, {})

const words = Object.keys(messageFrequency).map((message) => ({
  text: message,
  value: messageFrequency[message],
}))

const callbacks = {
  getWordTooltip: (word) => `${word.text} (${word.value})`,
}

export default function MyWordcloud() {
  return <ReactWordcloud callbacks={callbacks} words={words} />
}
