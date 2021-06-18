const calculateTotalEarnedCredits = (transcript) => {
  let totalEarnedCredits = 0;
  for (let i = 0; i < transcript.length; i++) {
    totalEarnedCredits += transcript[i].credit;
  }

  return totalEarnedCredits;
};

const calculateValidEarnedCredits = (transcript) => {
  let validEarnedCredits = 0;
  for (let i = 0; i < transcript.length; i++) {
    if (transcript[i].isGradePercentage) {
      validEarnedCredits += transcript[i].credit;
    }
  }

  return validEarnedCredits;
};

const calculateTotalGradePoints = (transcript) => {
  let totalGradePoints = 0;
  for (let i = 0; i < transcript.length; i++) {
    if (transcript[i].isGradePercentage) {
      totalGradePoints += transcript[i].percentage * transcript[i].credit;
    }
  }

  return totalGradePoints;
};

const calculateTotalFourScaleGradePoints = (transcript) => {
  let totalFourScaleGradePoints = 0;
  for (let i = 0; i < transcript.length; i++) {
    if (transcript[i].isGradePercentage) {
      totalFourScaleGradePoints +=
        transcript[i].fourScale * transcript[i].credit;
    }
  }
  return totalFourScaleGradePoints;
};

const calculateAveragePercentageGPA = (transcript) => {
  return (
    calculateTotalGradePoints(transcript) /
    calculateValidEarnedCredits(transcript)
  );
};

const calculateAverageFourScaleGPA = (transcript) => {
  return (
    calculateTotalFourScaleGradePoints(transcript) /
    calculateValidEarnedCredits(transcript)
  );
};

// console.log(transcript);
// console.log(calculateTotalEarnedCredits(transcript));
// console.log(calculateValidEarnedCredits(transcript));
// console.log(calculateTotalGradePoints(transcript));
// console.log(calculateCumulativePercentageGPA(transcript));
// console.log(calculateTotalFourScaleGradePoints(transcript));
// console.log(calculateCumulativeFourScaleGPA(transcript));
module.exports = {
  calculateAverageFourScaleGPA,
  calculateAveragePercentageGPA,
  calculateTotalEarnedCredits,
};
