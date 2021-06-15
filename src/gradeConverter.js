const convertPercentagetoFourScale = (gradePercentage) =>{
    if(gradePercentage >= 85 && gradePercentage <= 100) {
        return 4.0;
    } else if (gradePercentage >= 80 && gradePercentage <= 84 ){
        return 3.7;
    } else if (gradePercentage >= 77 && gradePercentage <= 79){
        return 3.3;
    } else if (gradePercentage >= 73 && gradePercentage <= 76){
        return 3.0;
    } else if (gradePercentage >= 70 && gradePercentage <= 72){
        return 2.7;
    } else if (gradePercentage >= 67 && gradePercentage <= 69){
        return 2.3;
    } else if (gradePercentage >= 63 && gradePercentage <= 66){
        return 2.0;
    } else if (gradePercentage >= 60 && gradePercentage <= 62){
        return 1.7;
    } else if (gradePercentage >= 57 && gradePercentage <= 59){
        return 1.3;
    } else if (gradePercentage >= 53 && gradePercentage <= 56){
        return 1.0;
    } else if (gradePercentage >= 50 && gradePercentage <= 52){
        return 0.7;
    } else if (gradePercentage >= 0 && gradePercentage <= 49){
        return 0;
    } else {
        return "NOT A VALID PERCENTAGE NUMBER";
    }
}

module.exports = {
    convertPercentagetoFourScale,
};