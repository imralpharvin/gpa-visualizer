const parseTranscript = (transcriptText) => {
    let transcriptArray = transcriptText.split("\n");
    let transcript = [];
    console.log(transcriptArray);

    for(i = 0; i < transcriptArray.length; i++){
        console.log(transcriptArray[i].includes('*'));
        if(transcriptArray[i].includes('*')){
            let course = {};
            course["courseCode"] = transcriptArray[i];
            i++;
            course["percentage"] = parseFloat(transcriptArray[i]);
            course["isPercentageNum"] = !isNaN(transcriptArray[i]);
            i++;
            course["credit"] = parseFloat(transcriptArray[i]);
            i++;
            course["term"] = transcriptArray[i];
            transcript.push(course);
        }
    }
    return transcript;
}

module.exports = {
    parseTranscript,
};