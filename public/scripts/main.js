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
*/

var app = (function(){

  var state,
      status = ["setup", "respond", "success"];

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

  return {
    status:       state,
    changeToStep: goToStep,
    getResult:    result,
    getResponses: getResponses
  };

})();

app.changeToStep(1)
