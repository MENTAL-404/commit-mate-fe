import React, { useEffect, useState } from 'react'
import { PieChart, Pie, Sector } from 'recharts'

import {
  getSelectedRepo,
  SERVER_URL,
  ORGANIZATION,
  getHeader,
} from '../../utils/static'

const IssuePieChart = () => {
  const [data, setData] = useState([])
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${SERVER_URL}/organizations/${ORGANIZATION}/repositories/${getSelectedRepo()}/issues/stats`,
          {
            headers: getHeader(),
            credentials: 'include',
          }
        )

        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }

        const result = await response.json()
        const formattedData = [
          {
            name: '오픈된 이슈',
            value: result.data.open_count,
            fill: '#8BC38B',
          },
          {
            name: '해결된 이슈',
            value: result.data.close_count,
            fill: '#EB763C',
          },
        ]
        // const result = await response.json();

        setData(formattedData)
        // console.log(formattedData)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [])

  const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value,
    } = props
    const sin = Math.sin(-RADIAN * midAngle)
    const cos = Math.cos(-RADIAN * midAngle)
    const sx = cx + (outerRadius + 10) * cos
    const sy = cy + (outerRadius + 10) * sin
    const mx = cx + (outerRadius + 30) * cos
    const my = cy + (outerRadius + 30) * sin
    const ex = mx + (cos >= 0 ? 1 : -1) * 22
    const ey = my
    const textAnchor = cos >= 0 ? 'start' : 'end'

    return (
      <g>
        <text
          x={cx}
          y={cy}
          dy={8}
          textAnchor='middle'
          fill={fill}
          style={{ fontSize: 15, fontWeight: 'bold' }}
        >
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill='none'
        />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke='none' />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill='#333'
          style={{ fontSize: 14, fontWeight: '500' }}
        >{`Value: ${value}`}</text>
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          dy={18}
          textAnchor={textAnchor}
          fill='#999'
          style={{ fontSize: 12, fontWeight: '400' }}
        >
          {`(Rate ${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    )
  }

  const onPieEnter = (_, index) => {
    setActiveIndex(index)
  }

  return (
    <PieChart width={480} height={300}>
      <Pie
        activeIndex={activeIndex}
        activeShape={renderActiveShape}
        data={data}
        cx={240}
        cy={150}
        innerRadius={65}
        outerRadius={95}
        dataKey='value'
        onMouseEnter={onPieEnter}
      />
    </PieChart>
  )
}

export default IssuePieChart
