import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const {
  calculateAverageFourScaleGPA,
  calculateAveragePercentageGPA,
} = require('../api/gpaCalculator');

const GPAChart = ({ transcript }) => {
  const [value, setValue] = useState('percentage');

  const getSchoolYear = (semester) => {
    let session = semester[0];
    let firstHalf, secondHalf;

    if (session === 'F') {
      firstHalf = 2000 + parseInt(semester.slice(1));
      secondHalf = firstHalf + 1;
    } else if (session === 'W' || session === 'S') {
      secondHalf = 2000 + parseInt(semester.slice(1));
      firstHalf = secondHalf - 1;
    }
    return firstHalf + '-' + secondHalf;
  };

  const semesters = [...new Set(transcript.map((course) => course.term))];
  const schoolYears = [
    ...new Set(semesters.map((semester) => getSchoolYear(semester))),
  ].sort();

  let fallCourses = transcript.filter((course) => course.term[0] === 'F');
  let winterCourses = transcript.filter((course) => course.term[0] === 'W');
  let summerCourses = transcript.filter((course) => course.term[0] === 'S');

  let fallSemPercentageGPA = schoolYears.map((schoolYear) => {
    let fallYearCourses = fallCourses.filter(
      (course) => schoolYear === getSchoolYear(course.term)
    );
    return calculateAveragePercentageGPA(fallYearCourses);
  });

  let winterSemPercentageGPA = schoolYears.map((schoolYear) => {
    let winterYearCourses = winterCourses.filter(
      (course) => schoolYear === getSchoolYear(course.term)
    );
    return calculateAveragePercentageGPA(winterYearCourses);
  });

  let summerSemPercentageGPA = schoolYears.map((schoolYear) => {
    let summerYearCourses = summerCourses.filter(
      (course) => schoolYear === getSchoolYear(course.term)
    );
    return calculateAveragePercentageGPA(summerYearCourses);
  });

  let fallSemFourScaleGPA = schoolYears.map((schoolYear) => {
    let fallYearCourses = fallCourses.filter(
      (course) => schoolYear === getSchoolYear(course.term)
    );
    return calculateAverageFourScaleGPA(fallYearCourses);
  });

  let winterSemFourScaleGPA = schoolYears.map((schoolYear) => {
    let winterYearCourses = winterCourses.filter(
      (course) => schoolYear === getSchoolYear(course.term)
    );
    return calculateAverageFourScaleGPA(winterYearCourses);
  });

  let summerSemFourScaleGPA = schoolYears.map((schoolYear) => {
    let summerYearCourses = summerCourses.filter(
      (course) => schoolYear === getSchoolYear(course.term)
    );
    return calculateAverageFourScaleGPA(summerYearCourses);
  });

  const [fallSemData, setFallSemData] = useState(fallSemPercentageGPA);
  const [winterSemData, setWinterSemData] = useState(winterSemPercentageGPA);
  const [summerSemData, setSummerSemData] = useState(summerSemPercentageGPA);

  const handleChange = (e) => {
    setValue(e.target.value);
    if (e.target.value === 'percentage') {
      setFallSemData(fallSemPercentageGPA);
      setWinterSemData(winterSemPercentageGPA);
      setSummerSemData(summerSemPercentageGPA);
    } else if (e.target.value === '4.0scale') {
      setFallSemData(fallSemFourScaleGPA);
      setWinterSemData(winterSemFourScaleGPA);
      setSummerSemData(summerSemFourScaleGPA);
    }
  };

  const data = {
    labels: schoolYears,
    datasets: [
      {
        label: 'Fall',
        backgroundColor: 'rgb(255, 76, 76)',
        borderColor: 'rgb(255, 25, 25)',
        data: fallSemData,
      },
      {
        label: 'Winter',
        backgroundColor: 'rgb(255, 227, 76)',
        borderColor: 'rgb(255, 219, 25)',
        data: winterSemData,
      },
      {
        label: 'Summer',
        backgroundColor: 'rgb(76, 76, 76)',
        borderColor: 'rgb(25, 25, 25)',
        data: summerSemData,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return (
    <div>
      <h3>GPA Summary Graph</h3>
      <Bar data={data} options={options}></Bar>

      <RadioGroup
        style={{ display: 'inline-block', align: 'center' }}
        row
        aria-label='scale'
        name='scale'
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel
          value='percentage'
          control={<Radio />}
          label='Percentage'
        />
        <FormControlLabel
          value='4.0scale'
          control={<Radio />}
          label='4.0 Scale'
        />
      </RadioGroup>
    </div>
  );
};

export default GPAChart;
