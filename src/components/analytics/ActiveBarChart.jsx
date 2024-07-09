import { BarChart, Bar, XAxis, ResponsiveContainer, Tooltip } from 'recharts'
import { useEffect, useState } from 'react'
import {
  SERVER_URL,
  ORGANIZATION,
  AUTH_HEADER,
  getSelectedRepo,
} from '../../utils/static'

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        className='custom-tooltip'
        style={{
          backgroundColor: '#fff',
          padding: '5px',
          border: '1px solid #ccc',
        }}
      >
        <p className='label'>{`총 커밋 수: ${payload[0].value}`}</p>
      </div>
    )
  }

  return null
}

export default function ActiveBarChart() {
  const [active, setActive] = useState([])

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        const response = await fetch(
          `${SERVER_URL}/organizations/${ORGANIZATION}/repositories/${getSelectedRepo()}/commits/chart`,
          {
            headers: AUTH_HEADER,
          }
        )

        if (!response.ok) {
          throw new Error('Failed to fetch access token')
        }

        const data = await response.json()
        setActive(data)
      } catch (error) {
        console.error('Error fetching active data:', error)
      }
    }

    fetchRepositories()
  }, [])

  return (
    <ResponsiveContainer width='100%' height='100%'>
      <BarChart width={150} height={80} data={active.data}>
        <XAxis dataKey='date' axisLine={false} tickLine={false} />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey='commit_count' fill='#95d99e' radius={[15, 15, 15, 15]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
