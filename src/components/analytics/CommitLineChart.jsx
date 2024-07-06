import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

import { contribution } from '../../data/commitData'

// 데이터 변환 함수
const transformData = (data) => {
  return data.map((entry) => {
    const transformedEntry = { date: entry.date.slice(5) }
    entry.commits.forEach((commit) => {
      transformedEntry[commit.nickname] = commit.commit_count
    })
    return transformedEntry
  })
}

const data = transformData(contribution.data)

export default function CommitLineChart() {
  return (
    <ResponsiveContainer width='100%' height={400}>
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 30,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='date' />
        <Tooltip />
        <Legend />
        <Line
          type='monotone'
          dataKey='user1'
          stroke='#8884d8'
          strokeWidth={2}
        />
        <Line
          type='monotone'
          dataKey='user2'
          stroke='#82ca9d'
          strokeWidth={2}
        />
        <Line
          type='monotone'
          dataKey='user3'
          stroke='#ffc658'
          strokeWidth={2}
        />
        <Line
          type='monotone'
          dataKey='user4'
          stroke='#ff7300'
          strokeWidth={2}
        />
        <Line
          type='monotone'
          dataKey='user5'
          stroke='#387908'
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
