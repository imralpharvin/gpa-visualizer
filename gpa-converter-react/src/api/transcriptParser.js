const parseTranscript = (transcriptText) => {
  let transcriptArray = transcriptText.split("\n");
  //console.log("array " + transcriptArray);
  let transcript = [];

  for (let i = 0; i < transcriptArray.length; i++) {
    let lineSplit = [];
    lineSplit = transcriptArray[i].split(" ");
    //console.log(lineSplit);

    if (
      lineSplit.length >= 2 &&
      lineSplit[lineSplit.length - 2].includes(".")
    ) {
      console.log(lineSplit);
      let courseText = lineSplit;
      let course = {
        courseCode: courseText[0],
        grade: courseText[courseText.length - 3],
        credit: parseFloat(courseText[courseText.length - 2]),
        term: courseText[courseText.length - 1],
      };
      if (!isNaN(parseFloat(course.grade))) {
        course.percentage = parseFloat(course.grade);
        course.isGradePercentage = true;
      } else {
        course.percentage = NaN;
        course.isGradePercentage = false;
      }

      console.log(course);
      transcript.push(course);
    }
  }

  return transcript;
};

module.exports = {
  parseTranscript,
};
