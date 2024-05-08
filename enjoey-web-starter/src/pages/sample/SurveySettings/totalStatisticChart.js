import React, { Component } from 'react';
import { Pie, PieChart, ResponsiveContainer } from 'recharts';

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
    const { totalSurveySubmissions, questionItem, answerCount, questionText } = this.props;
    console.log(answerCount);
    console.log(questionText);
    let data = [];

    if (questionItem.length === 0) {
      data.push({
        name: questionText,
        value: answerCount[questionText] === 0 ? 0.05 : answerCount[questionText], // Set value to 0.05 if undefined
        originalValue: answerCount[questionText] || 0, // Store the original value separately
      });
    } else {
      data = questionItem.map((item) => ({
        name: item,
        value: answerCount[item] === 0 ? 0.05 : answerCount[item], // Set value to 0 if undefined
        originalValue: answerCount[item] || 0, // Store the original value separately
      }));
    }

    if (totalSurveySubmissions !== undefined) {
      data.unshift({
        name: "Total",
        value: totalSurveySubmissions || 0, // Set value to 0 if undefined
        originalValue: totalSurveySubmissions || 0, // Store the original value separately
      });
    }

    console.log("data", data);

    return (
      <ResponsiveContainer width='100%' height={300}>
        <PieChart>
          <Pie
            dataKey='value'
            data={data}
            innerRadius={60}
            outerRadius={80}
            fill='#4299E1'
            label={({ name, originalValue }) => `${name}: ${originalValue}`}
          />
        </PieChart>
      </ResponsiveContainer>
    );
  }
}

export default CustomActiveShapePieChart;