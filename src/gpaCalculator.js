const {parseTranscript} = require('./transcriptParser');
const {convertTranscript} = require('./gpaConverter');

const transcriptText = "Skip to Main Content\nUniversity of Guelph\nOffice of Registrarial Services\nWebAdvisor for Ralph Arvin D.\nUniversity of Guelph-Humber Logo\nHelp\nStudents Menu\nMain Menu\nLog Out\nHave a question? Ask Gryph!\n \nUnofficial Transcript\n0923223 Ralph Arvin De Castro\nCourse/Section and Title	Grade	Credits	Repeat	Term\nCIS*4300 0101 Human Computer Interaction\n090\n0.50\nF20\nCIS*4510 0101 Computer Security Foundations\n092\n0.50\nF20\nCIS*4900 01 Computer Science Project\n090\n0.50\nF20\nCIS*2170 0103 User Interface Design\n093\n0.75\nW20\nCIS*3110 0103 Operating Systems\n088\n0.50\nW20\nCIS*3760 0102 Software Engineering\nP\n0.75\nW20\nCIS*2030 0103 Structure/Applicat - Microcomp\n075\n0.50\nF19\nCIS*2910 0104 Discrete Structures in Comp II\n065\n0.50\nF19\nCIS*3750 0104 Syst Analysis & Design in App\n076\n0.75\nF19\nBIOM*4522 01 Research in Biomedical Sci.\n087\n1.00\nW19\nCIS*2750 0207 Software System Dvlmt & Intgrn\n078\n0.75\nW19\nBIOM*4521 01 Research in Biomedical Sci.\n087\n1.00\nF18\nCIS*2430 0103 Object Oriented Programming\n088\n0.50\nF18\nCIS*3530 0101 Data Base Systems & Concepts\n091\n0.50\nF18\nCIS*2520 DE01 Data Structures\n081\n0.50\nS18\nBIOL*3300 0101 Applied Bioinformatics\n088\n0.50\nW18\nCIS*1910 0101 Discrete Structures in Comp I\n096\n0.50\nW18\nCIS*2500 0115 Intermediate Programming\n093\n0.50\nW18\nHK*3402 0104 Human Anatomy: Dissection\n093\n0.75\nW18\nBIOC*3560 01 Structure & Function in Bioche\n090\n0.50\nF17\nHK*3401 0104 Human Anatomy: Dissection\n093\n0.75\nF17\nMICR*3230 01 Immunology\n080\n0.50\nF17\nPOPM*3240 DE Epidemiology\n091\n0.50\nF17\nBIOM*3090 DE Principles of Pharmacology\n080\n0.50\nS17\nCIS*2050 DE Computers and Society\n085\n0.50\nS17\nPATH*3610 DE Principles of Disease\n083\n0.50\nS17\nBIOM*3200 01 Biomedical Physiology\n092\n1.00\nW17\nCIS*1500 0102 Introduction to Programming\n090\n0.50\nW17\nMCB*2050 0112 Molecular Biology of the Cell\n084\n0.50\nW17\nNUTR*3210 01 Fundamentals of Nutrition\n079\n0.50\nW17\nSTAT*2040 02 Statistics I\n087\n0.50\nW17\nANSC*2340 DE Structure of Farm Animals\n078\n0.50\nF16\nBIOC*2580 0246 Introduction to Biochemistry\n092\n0.50\nF16\nFRHD*1010 DE Human Development\n093\n0.50\nF16\nITAL*1060 0102 Introductory Italian I\n091\n0.50\nF16\nMBG*2040 0218 Foundations Mol Biol Genetics\n086\n0.50\nF16\nBIOL*1070 0231 Discovering Biodiversity\n079\n0.50\nW16\nBIOL*1080 0221 Biological Concepts of Health\n087\n0.50\nW16\nCHEM*1050 0356 General Chemistry II\n090\n0.50\nW16\nCIS*1000 DE Intro to Computer Applications\n092\n0.50\nW16\nPHYS*1080 0101 Physics for Life Sciences\n084\n0.50\nW16\nBIOL*1090 0106 Intro to Molecular & Cell Biol\n085\n0.50\nF15\nCHEM*1040 04A3 General Chemistry I\n090\n0.50\nF15\nMATH*1080 0101 Elements of Calculus I\n095\n0.50\nF15\nPHYS*1300 0118 Fundamentals of Physics\n087\n0.50\nF15\nPSYC*1000 04 Introduction to Psychology\n090\n0.50\nF15\nTotal Earned Credits	\n26.00\nTotal Grade Points	\n2193.25\nCumulative GPA	\n86.861\nIf you require a student record or information on program requirements in an alternate format, please contact ups@uoguelph.ca .\nUniversity of Guelph\n50 Stone Road East\nGuelph, Ontario, N1G 2W1\nCanada\n519-824-4120\n© Office of Registrarial Services"

let preTranscript = parseTranscript(transcriptText);
console.log(preTranscript);
let transcript = convertTranscript(preTranscript);

console.log(transcript);

let calculateTotalEarnedCredits = (transcript) =>{
    let totalEarnedCredits = 0;
    for(i = 0; i < transcript.length; i ++){
        totalEarnedCredits += transcript[i].credit;
    }

    return totalEarnedCredits;
}

let calculateValidEarnedCredits = (transcript) =>{
    let validEarnedCredits = 0;
    for(i = 0; i < transcript.length; i ++){
        if(transcript[i].isPercentageNum){
            validEarnedCredits += transcript[i].credit;
        }
    }

    return validEarnedCredits;
}

let calculateTotalGradePoints = (transcript) =>{
    let totalGradePoints = 0;
    for(i = 0; i < transcript.length; i ++){
        if(transcript[i].isPercentageNum){
            totalGradePoints += transcript[i].percentage * transcript[i].credit;
        }
    }

    return totalGradePoints;
}

let calculateTotalFourScaleGradePoints = (transcript) =>{
    let totalFourScaleGradePoints = 0;
    for(i = 0; i < transcript.length; i ++){
        if(transcript[i].isPercentageNum){
            totalFourScaleGradePoints += transcript[i].fourScale * transcript[i].credit;
        }
    }
    return totalFourScaleGradePoints;
}

let calculateCumulativePercentageGPA = (transcript) => {
    
    return calculateTotalGradePoints(transcript)/calculateValidEarnedCredits(transcript);
}

let calculateCumulativeFourScaleGPA = (transcript) => {
    
    return calculateTotalFourScaleGradePoints(transcript)/calculateValidEarnedCredits(transcript);
}

console.log(transcript);
console.log(calculateTotalEarnedCredits(transcript));
console.log(calculateValidEarnedCredits(transcript));
console.log(calculateTotalGradePoints(transcript));
console.log(calculateCumulativePercentageGPA(transcript));
console.log(calculateTotalFourScaleGradePoints(transcript));
console.log(calculateCumulativeFourScaleGPA(transcript));

