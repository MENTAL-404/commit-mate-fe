import { BarChart, Bar, XAxis, ResponsiveContainer, Tooltip } from 'recharts'
import { active } from '../../data/homeData'

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
