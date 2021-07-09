import React from 'react';

const GPATable = ({ courses }) => {
  return (
    <>
      {courses.length === 0 ? (
        ''
      ) : (
        <table>
          <thead>
            <tr>
              <th>Course</th>
              <th>Grade</th>
              <th>4.0 Scale</th>
              <th>Credit</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => {
              const {
                courseCode,
                grade,
                credit,
                isGradePercentage,
                fourScale,
                term,
              } = course;

              return (
                <tr key={courseCode + term + index}>
                  <td>{courseCode}</td>
                  <td>{grade}</td>
                  <td>{isGradePercentage ? fourScale.toFixed(1) : '-'}</td>
                  <td>{credit}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};

export default GPATable;
