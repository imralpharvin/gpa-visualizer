const { convertPercentagetoFourScale } = require("./gradeConverter");

const convertTranscript = (transcript) => {
  for (let i = 0; i < transcript.length; i++) {
    transcript[i]["fourScale"] = convertPercentagetoFourScale(
      transcript[i].percentage
    );
  }

  return transcript;
};

module.exports = {
  convertTranscript,
};
