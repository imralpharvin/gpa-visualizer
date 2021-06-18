import React from "react";
import GPATable from "./GPATable";
const {
  calculateAverageFourScaleGPA,
  calculateAveragePercentageGPA,
  calculateTotalEarnedCredits,
} = require("../api/gpaCalculator");

const SemesterGPA = ({ courses }) => {
  return (
    <>
      {courses.length === 0 ? (
        "No Courses"
      ) : (
        <div className="semesterGPA">
          <GPATable courses={courses} />
          <hr />
          <div style={{ textAlign: "right" }}>
            <h5>Credits: {calculateTotalEarnedCredits(courses).toFixed(2)}</h5>
            <h5>
              GPA (%): {calculateAveragePercentageGPA(courses).toFixed(2)}
            </h5>
            <h5>
              GPA (4.0): {calculateAverageFourScaleGPA(courses).toFixed(2)}
            </h5>
          </div>
        </div>
      )}
    </>
  );
};

export default SemesterGPA;
