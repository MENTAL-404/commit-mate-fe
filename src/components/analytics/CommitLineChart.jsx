import React, { useEffect, useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { API_URL } from '../../utils/static'
import useFetchData from '../../hooks/useFetchData'

const CommitLineChart = () => {
  const { loading, response, error } = useFetchData(
    API_URL().commit_contribution
  )
  const [contribution, setContribution] = useState([])

  useEffect(() => {
    if (response) {
      const transformedData = transformData(response.data)
      setContribution(transformedData)
    }
  }, [response])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error fetching data</div>
  }

  return (
    <ResponsiveContainer width='100%' height={400}>
      <LineChart
        width={500}
        height={300}
        data={contribution}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='date' tick={{ fontSize: 10 }} />
        <Tooltip
          contentStyle={{ fontSize: 12 }}
          labelStyle={{ fontSize: 12 }}
        />
        <Legend wrapperStyle={{ fontSize: 15 }} />
        {contribution.length > 0 &&
          Object.keys(contribution[0])
            .filter((key) => key !== 'date')
            .map((user) => (
              <Line
                key={user}
                type='monotone'
                dataKey={user}
                stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`} // 각 사용자에 대해 랜덤 색상 지정
                strokeWidth={2}
              />
            ))}
      </LineChart>
    </ResponsiveContainer>
  )
}

const transformData = (data) => {
  const { users, commits } = data
  const transformedData = []

  for (const date in commits) {
    const entry = { date: date.slice(5) } // 월-일 형식으로 변환
    users.forEach((user) => {
      entry[user] = commits[date].counts[user] || 0
    })
    transformedData.push(entry)
  }

  return transformedData
}

export default CommitLineChart
