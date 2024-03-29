import React from 'react';
import SemesterGPA from './SemesterGPA';
const {
  calculateAverageFourScaleGPA,
  calculateAveragePercentageGPA,
  calculateTotalEarnedCredits,
} = require('../api/gpaCalculator');

const AnnualGPA = ({ schoolYear, courses }) => {
  let firstHalf = schoolYear.split('-')[0];
  let secondHalf = schoolYear.split('-')[1];

  let fallCourses = courses.filter((course) => course.term[0] === 'F');
  let winterCourses = courses.filter((course) => course.term[0] === 'W');
  let summerCourses = courses.filter((course) => course.term[0] === 'S');

  let annualPercentageGPA = calculateAveragePercentageGPA([
    ...fallCourses,
    ...winterCourses,
  ]).toFixed(2);

  let annualFourScaleGPA = calculateAverageFourScaleGPA([
    ...fallCourses,
    ...winterCourses,
  ]).toFixed(2);

  let fullAnnualPercentageGPA =
    calculateAveragePercentageGPA(courses).toFixed(2);

  let fullAnnualFourScaleGPA = calculateAverageFourScaleGPA(courses).toFixed(2);

  let isAnnualGPANum = !isNaN(annualPercentageGPA);
  let isFullAnnualGPANum = !isNaN(fullAnnualPercentageGPA);

  return (
    <div className='annualGPA'>
      <h2>{schoolYear}</h2>
      <div className='row'>
        <div className='column'>
          <h4>Fall {firstHalf}</h4>
          <SemesterGPA courses={fallCourses} />
        </div>
        <div
          className='column'
          style={{ borderRight: '2px solid var(--clr-grey-8)' }}
        >
          <h4>Winter {secondHalf}</h4>
          <SemesterGPA courses={winterCourses} />
        </div>

        <div className='column'>
          <h4>Summer {secondHalf}</h4>
          <SemesterGPA courses={summerCourses} />
        </div>
      </div>
      <hr />
      <div className='row'>
        <div className='column'>-</div>
        <div
          className='column'
          style={{ borderRight: '2px solid var(--clr-grey-8)' }}
        >
          {fallCourses.length + winterCourses.length === 0 ? (
            '-'
          ) : (
            <div style={{ textAlign: 'right' }}>
              <h4>
                Credits:{' '}
                {calculateTotalEarnedCredits([
                  ...fallCourses,
                  ...winterCourses,
                ]).toFixed(2)}
              </h4>
              <h4>
                Annual GPA (%): {isAnnualGPANum ? annualPercentageGPA : ' - '}
              </h4>
              <h4>
                Annual GPA (4.0): {isAnnualGPANum ? annualFourScaleGPA : ' - '}
              </h4>
            </div>
          )}
        </div>

        <div className='column'>
          {summerCourses.length === 0 ? (
            '-'
          ) : (
            <div style={{ textAlign: 'right' }}>
              <h4>
                Credits: {calculateTotalEarnedCredits(courses).toFixed(2)}
              </h4>
              <h4>
                Annual GPA w/ Summer (%):{' '}
                {isFullAnnualGPANum ? fullAnnualPercentageGPA : ' - '}
              </h4>
              <h4>
                Annual GPA w/ Summer (4.0):{' '}
                {isFullAnnualGPANum ? fullAnnualFourScaleGPA : ' - '}
              </h4>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnnualGPA;
