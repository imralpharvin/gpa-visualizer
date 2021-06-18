const parseTranscript = (transcriptText) => {
  let transcriptArray = transcriptText.split(" \n");
  //console.log("array " + transcriptArray);
  let transcript = [];
  //console.log(transcriptArray);

  for (let i = 0; i < transcriptArray.length; i++) {
    //console.log(transcriptArray[i].includes('*'));
    if (transcriptArray[i].includes("*")) {
      let course = {};
      if (transcriptArray[i].includes("Term ")) {
        course["courseCode"] = transcriptArray[i].split("Term ")[1];
      } else {
        course["courseCode"] = transcriptArray[i];
      }

      i++;

      course["isGradePercentage"] = !isNaN(transcriptArray[i]);
      if (course["isGradePercentage"]) {
        course["grade"] = parseFloat(transcriptArray[i]);
      } else {
        course["grade"] = transcriptArray[i];
      }

      course["percentage"] = parseFloat(transcriptArray[i]);

      i++;
      course["credit"] = parseFloat(transcriptArray[i]);
      i++;
      course["term"] = transcriptArray[i];
      transcript.push(course);
    }
  }
  //console.log(transcript);
  return transcript;
};

module.exports = {
  parseTranscript,
};
