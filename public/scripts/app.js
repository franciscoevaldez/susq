// main javascript file

/* this app needs to:
  - handle app status                   this file
  - change views                        this file
  - setup answer view                   this file
  - send the form email request         this file
  - handle ui interactions              ui.js
  - show and hide error messages        ui.js
  - validate inputs on setup screens    validators.js
  - validate form responses             validators.js
  - describe a Questionnaire object     questionnaire.js
      - hold title
      - hold destination email
  - describe a Response object          response.js
      - hold user name
      - hold individual answers
      - hold final score
*/

/* This file will:
  - Handle app status
  - Change views
  - Generate response JSON
*/

var app = (function(){

  var state,
      status = ["setup", "respond", "ending", "results"];

  // required DOM elements
  var body = document.body;

  // initialization
  console.log('App initializated with status 0')

  // jump to step
  function goToStep(newState){

    if (newState >= status.length) {
      console.log('State change failed, requested state is out of range');
      return
    }

    state = status[newState];

    // update UI
    _cleanBody();
    body.classList.add("status--" + status[newState]);

  }

  // clean body classes
  function _cleanBody(){
    for (var i = 0; i < status.length; i++) {
      body.classList.remove("status--" + status[i]);
    }
  }

  // get radio elements
  var radioSets = [];
  for (var i = 0; i < 10; i++) {
    var _responseID = 'q' + i;
    radioSets[i] = document.getElementsByName(_responseID)
  }

  // get score from responses
  var getScoreFromResponses = function(responses){

    // odd response normalization is not needed
    // normalize even responses
    for (var i = 1; i < responses.length; i=i+2) {
      responses[i] = 4 - responses[i]
    }

    // add all responses
    var sum = 0;
    for (var i = 0; i < responses.length; i++) {
      sum = sum + responses[i]
    }

    // multiply
    var result = sum * 2.5;

    return result;

  }

  // get responses
  var getResponses = function(){

    // loop through question arrays
    var _picks = []
    for (var i = 0; i < radioSets.length; i++) {

      _radioSet = radioSets[i];

      for (var sel = 0; sel < _radioSet.length; sel++) {
        if(_radioSet[sel].checked){
          _picks[i] = sel;
        }
      }

    }

    return _picks;

  }

  // get results
  var result = function(){

    // get picked values
    _responses = getResponses();
    // calculate score from responses
    var _score = getScoreFromResponses(_responses);

    return _score;

  }

  // generate the response JSON
  var getJSON = function(){
    var id        = 1,                                  // form ID - ONLY DEV (SHOULD PICK UP FROM URL LATER)
        name      = "tu vieja",                         // get respondant name
        responses = getResponses(),                     // get responses
        score     = getScoreFromResponses(responses);   // get final score

    var formData = {
          formId:       id,
          name:         name,
          answers:      [
                        { answerId:0, value: responses[0]},
                        { answerId:1, value: responses[1]},
                        { answerId:2, value: responses[2]},
                        { answerId:3, value: responses[3]},
                        { answerId:4, value: responses[4]},
                        { answerId:5, value: responses[5]},
                        { answerId:6, value: responses[6]},
                        { answerId:7, value: responses[7]},
                        { answerId:8, value: responses[8]},
                        { answerId:9, value: responses[9]},
                    ],
          scoreFinal:   score
        }

    return formData;
  }

  return {
    status:       state,
    changeToStep: goToStep,
    getResult:    result,
    getResponses: getResponses,
    getJSON:      getJSON
  };

})();

app.changeToStep(3)
