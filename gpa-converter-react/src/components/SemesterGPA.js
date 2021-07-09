import React from 'react';
import GPATable from './GPATable';
const {
  calculateAverageFourScaleGPA,
  calculateAveragePercentageGPA,
  calculateTotalEarnedCredits,
} = require('../api/gpaCalculator');

const SemesterGPA = ({ courses }) => {
  const totalEarnedCredits = calculateTotalEarnedCredits(courses).toFixed(2);
  const averagePercentageGPA =
    calculateAveragePercentageGPA(courses).toFixed(2);
  const averageFourScaleGPA = calculateAverageFourScaleGPA(courses).toFixed(2);
  return (
    <>
      {courses.length === 0 ? (
        'No Courses'
      ) : (
        <div className='semesterGPA'>
          <GPATable courses={courses} />
          <hr />
          <div style={{ textAlign: 'right' }}>
            <h5>Credits: {totalEarnedCredits}</h5>
            <h5>
              GPA (%):{' '}
              {!isNaN(averagePercentageGPA) ? averagePercentageGPA : '-'}
            </h5>
            <h5>
              GPA (4.0):{' '}
              {!isNaN(averageFourScaleGPA) ? averageFourScaleGPA : '-'}
            </h5>
          </div>
        </div>
      )}
    </>
  );
};

export default SemesterGPA;
