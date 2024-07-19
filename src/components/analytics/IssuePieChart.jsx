import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { PieChart, Pie, Sector } from 'recharts'
import { API_URL } from '../../utils/static'
import useFetchData from '../../hooks/useFetchData'
import LoadingLottie from '../LoadingLottie'
import styles from '../../../src/styles/IssuePieChart.module.css'

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

renderActiveShape.propTypes = {
  cx: PropTypes.number,
  cy: PropTypes.number,
  midAngle: PropTypes.number,
  innerRadius: PropTypes.number,
  outerRadius: PropTypes.number,
  startAngle: PropTypes.number,
  endAngle: PropTypes.number,
  fill: PropTypes.string,
  payload: PropTypes.object,
  percent: PropTypes.number,
  value: PropTypes.number,
}

const IssuePieChart = () => {
  const { loading, response, error } = useFetchData(API_URL().issue_state)
  const [data, setData] = useState()
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (response) {
      const formattedData = [
        {
          name: '오픈된 이슈',
          value: response.data.open_count,
          fill: '#8BC38B',
        },
        {
          name: '해결된 이슈',
          value: response.data.close_count,
          fill: '#EB763C',
        },
      ]
      setData(formattedData)
    }
  }, [response])

  const onPieEnter = (_, index) => {
    setActiveIndex(index)
  }

  if (error) {
    return <div>Error fetching data</div>
  }

  return loading ? (
    <div className={styles.lottie}>
      <LoadingLottie width={'50px'} />
    </div>
  ) : (
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
