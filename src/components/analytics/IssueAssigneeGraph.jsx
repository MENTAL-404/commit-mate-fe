import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { API_URL } from '../../utils/static'
import useFetchData from '../../hooks/useFetchData'
import styles from '../../../src/styles/IssueAssigneeGraph.module.css'
import LoadingLottie from '../LoadingLottie'

const IssueAssigneeGraph = () => {
  const { loading, response, error } = useFetchData(API_URL().issue_assignee)

  const issues = response ? response.data : []

  const data = issues.map((assignee) => ({
    name: assignee.nickname,
    open: assignee.open,
    closed: assignee.close,
  }))

  const CustomTick = ({ x, y, payload }) => {
    const { value } = payload
    const assignee = issues.find((assignee) => assignee.nickname === value)

    return (
      <g transform={`translate(${x},${y})`}>
        <defs>
          <clipPath id={`clip-circle-${value}`}>
            <circle cx='0' cy='12' r='12' />
          </clipPath>
        </defs>
        <image
          href={assignee.avatar_url}
          x={-12}
          y={0}
          height={24}
          width={24}
          clipPath={`url(#clip-circle-${value})`}
        />
        <text
          x={0}
          y={35}
          dy={0}
          textAnchor='middle'
          fill='#666'
          fontSize={14}
          fontWeight='400'
        >
          {value}
        </text>
      </g>
    )
  }

  if (error) {
    return <div>Error fetching data</div>
  }

  return loading ? (
    <div className={styles.lottie}>
      <LoadingLottie width={'50px'} />
    </div>
  ) : (
    <ResponsiveContainer width='100%' height={350}>
      <BarChart
        width={500}
        height={200}
        data={data}
        margin={{
          top: 5,
          right: 50,
          left: 50,
          bottom: 50,
        }}
        stackOffset='sign'
      >
        <CartesianGrid
          strokeDasharray='3 3'
          vertical={false}
          horizontal={true}
        />
        <XAxis
          dataKey='name'
          tick={<CustomTick />}
          axisLine={true}
          tickLine={false}
        />
        <Tooltip contentStyle={{ fontSize: 12, fontWeight: '500' }} />
        <Legend
          verticalAlign='top'
          align='right'
          wrapperStyle={{
            fontSize: 14,
            fontWeight: '600',
            marginBottom: '20px',
          }}
        />
        <Bar
          dataKey='closed'
          stackId='a'
          fill='#EB763C'
          radius={[0, 0, 0, 0]}
          name='해결된 이슈'
          barSize={50}
        />
        <Bar
          dataKey='open'
          stackId='a'
          fill='#82ca9d'
          radius={[0, 0, 0, 0]}
          name='오픈된 이슈'
          barSize={50}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default IssueAssigneeGraph
