// this class should take a JSON and return 
var susResult = (function(){

    var answers = [],
        scores = [];

    var getFinalScore = function(){
        var sum = 0,
            count = scores.length,
            average;

        for (var index = 0; index < scores.length; index++) {
            sum = sum + scores[index];
        }

        average = Math.round(sum / count);

        return average;
    }

    var parseJSON = function(susAnswer){

        // loop through answers
        for (var index = 0; index < susAnswer.length; index++) {
            var anAnswer = susAnswer[index];
            answers[index] = anAnswer.answers;
            scores[index] = anAnswer.scoreFinal;
        }

    }

    var showResponses = function(){

    }

    return{
        answers         : answers,
        scores          : scores,
        finalScore      : getFinalScore,
        parseJSON       : parseJSON,
        showResponses   : showResponses
    }

}) ();