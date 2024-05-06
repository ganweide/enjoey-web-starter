import React, { Component } from 'react';
import { Pie, PieChart, ResponsiveContainer, Sector } from 'recharts';

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
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
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor='middle' fill={fill}>
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
        dy={5}
        textAnchor={textAnchor}
        fill='#333'
      >{`${value}`}</text>
      {/* <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill='#999'
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text> */}
    </g>
  );
};

class CustomActiveShapePieChart extends Component {
  constructor() {
    super();
    this.state = { activeIndex: 0 };
  }

  onPieEnter = (data, index) => {
    this.setState({
      activeIndex: index,
    });
  };

  render() {
    const { totalSurveySubmissions, questionItem, answerCount } = this.props;
    let data = [];

    if (totalSurveySubmissions !== undefined) {
      const totalSubmissionData = [
        {
          name: "Total",
          value: totalSurveySubmissions || 0, // If there's no value, default to 0
        },
      ];

      const questionItemData = questionItem.map((item) => ({
        name: item,
        value: answerCount[item] || 0,
      }));

      data = totalSubmissionData.concat(questionItemData);
    } else {
      data = questionItem.map((item) => ({
        name: item,
        value: answerCount[item] || 0,
      }));
    }

    return (
      <ResponsiveContainer width='100%' height={300}>
        <PieChart>
          <Pie
            dataKey='value'
            activeIndex={this.state.activeIndex}
            activeShape={renderActiveShape}
            onMouseEnter={this.onPieEnter}
            data={data}
            innerRadius={60}
            outerRadius={80}
            fill='#4299E1'
          />
        </PieChart>
      </ResponsiveContainer>
    );
  }
}

export default CustomActiveShapePieChart;