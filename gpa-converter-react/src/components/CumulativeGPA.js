import AnnualGPA from "./AnnualGPA";
import GPATable from "./GPATable";
const {
  calculateAverageFourScaleGPA,
  calculateAveragePercentageGPA,
  calculateTotalEarnedCredits,
} = require("../api/gpaCalculator");

const CumulativeGPA = ({ transcript }) => {
  const getSchoolYear = (semester) => {
    let session = semester[0];
    let firstHalf, secondHalf;

    if (session === "F") {
      firstHalf = 2000 + parseInt(semester.slice(1));
      secondHalf = firstHalf + 1;
    } else if (session === "W" || session === "S") {
      secondHalf = 2000 + parseInt(semester.slice(1));
      firstHalf = secondHalf - 1;
    }
    return firstHalf + "-" + secondHalf;
  };

  const gpa = calculateAverageFourScaleGPA(transcript).toFixed(2);
  const semesters = [...new Set(transcript.map((course) => course.term))];
  const schoolYears = [
    ...new Set(semesters.map((semester) => getSchoolYear(semester))),
  ];

  console.log(semesters);
  console.log(schoolYears);

  return (
    <div className="cumulativeGPA">
      {schoolYears.map((schoolYear) => {
        console.log(schoolYear);
        const courses = transcript.filter(
          (course) => getSchoolYear(course.term) === schoolYear
        );
        return (
          <AnnualGPA
            key={schoolYear}
            schoolYear={schoolYear}
            courses={courses}
          />
        );
      })}

      {/* <GPATable courses={transcript} /> */}
      <div style={{ textAlign: "right" }}>
        <h3>
          Total Earned Credits:{" "}
          {calculateTotalEarnedCredits(transcript).toFixed(2)}
        </h3>
        <h3>
          Cumulative GPA (%):{" "}
          {calculateAveragePercentageGPA(transcript).toFixed(2)}
        </h3>
        <h3>Cumulative GPA (4.0): {gpa}</h3>
      </div>
    </div>
  );
};

export default CumulativeGPA;
