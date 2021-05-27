const {convertPercentagetoFourScale} = require('./gpaConverter');

let transcript = [{course : "Math", percentage: 90}, { course: "Science", percentage: 85}];

const convertTranscript = (transcript) => {
   for(i = 0; i < transcript.length; i++){
    transcript[i]["fourScale"] = convertPercentagetoFourScale (transcript[i].percentage);
   } 
} 

convertTranscript(transcript);

console.log(transcript);