import { BarChart, Bar, XAxis, ResponsiveContainer, Tooltip } from 'recharts'
import { API_URL } from '../../utils/static'
import useFetchData from '../../hooks/useFetchData'
import LoadingLottie from '../LoadingLottie'

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
  const {
    loading,
    response: active,
    error,
  } = useFetchData(API_URL().commit_chart)

  if (loading) {
    return <LoadingLottie width={'50px'} />
  }

  if (error) {
    return <div>Error fetching data</div>
  }

  return (
    <ResponsiveContainer width='100%' height='100%'>
      <BarChart width={150} height={80} data={active?.data}>
        <XAxis dataKey='date' axisLine={false} tickLine={false} />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey='commit_count' fill='#95d99e' radius={[15, 15, 15, 15]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
