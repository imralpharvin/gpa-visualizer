import AnnualGPA from './AnnualGPA';
import jsPDF from 'jspdf';
import Button from 'react-bootstrap/Button';
import html2pdf from 'html2pdf.js';

const {
  calculateAverageFourScaleGPA,
  calculateAveragePercentageGPA,
  calculateTotalEarnedCredits,
} = require('../api/gpaCalculator');

const CumulativeGPA = ({ transcript }) => {
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

  const gpa = calculateAverageFourScaleGPA(transcript).toFixed(2);
  const semesters = [...new Set(transcript.map((course) => course.term))];
  const schoolYears = [
    ...new Set(semesters.map((semester) => getSchoolYear(semester))),
  ];

  console.log(semesters);
  console.log(schoolYears);

  const handleonClick = () => {
    let element = document.getElementById('gpacontent');
    element.scrollIntoView();
    var opt = {
      margin: 0.1,
      filename: 'myfile.pdf',
      image: { type: 'png', quality: 0.98 },
      html2canvas: {
        scale: 2,
        letterRendering: true,
      },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };
    var worker = html2pdf().from(element).set(opt).save();
    // let doc = new jsPDF('p', 'pt', 'a4');
    // doc.html(
    //   document.getElementById('gpacontent', {
    //     callback: function (doc) {
    //       doc.save('mypdf.pdf');
    //     },
    //   })
    // );
  };

  return (
    <div className='cumulativeGPA' id='cumulativeGPA'>
      <div id='gpacontent'>
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
        <div style={{ textAlign: 'right' }}>
          <h3>
            Total Earned Credits:{' '}
            {calculateTotalEarnedCredits(transcript).toFixed(2)}
          </h3>
          <h3>
            Cumulative GPA (%):{' '}
            {calculateAveragePercentageGPA(transcript).toFixed(2)}
          </h3>
          <h3>Cumulative GPA (4.0): {gpa}</h3>
        </div>
      </div>
      <Button onClick={handleonClick}>Generate PDF</Button>
    </div>
  );
};

export default CumulativeGPA;
