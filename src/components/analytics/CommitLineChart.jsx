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
import {
  SERVER_URL,
  ORGANIZATION,
  getHeader,
  getSelectedRepo,
} from '../../utils/static'

const CommitLineChart = () => {
  const [contribution, setContribution] = useState([])

  useEffect(() => {
    const fetchContribution = async () => {
      try {
        const response = await fetch(
          `${SERVER_URL}/organizations/${ORGANIZATION}/repositories/${getSelectedRepo()}/commits/graph`,
          {
            headers: getHeader(),
            credentials: 'include',
          }
        )
        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }
        const result = await response.json()
        const transformedData = transformData(result.data)
        setContribution(transformedData)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchContribution()
  }, [])

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
        <XAxis dataKey='date' />
        <Tooltip />
        <Legend />
        {contribution.length > 0 &&
          Object.keys(contribution[0])
            .filter((key) => key !== 'date')
            .map((user, index) => (
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
