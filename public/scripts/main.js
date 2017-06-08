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

  var state
  var status = ["setup", "respond", "success"];

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

  return {
    status: state,
    changeToStep: goToStep
  };

})();

// temp only for development
app.changeToStep(1);
