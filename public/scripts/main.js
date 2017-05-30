// main javascript file

/* this app needs to:
  - handle app status
  - change views
  - handle ui interactions
  - validate inputs on setup screens
  - validate form responses
  - show and hide error messages
  - send the form email request
*/

/* This file will:
  - Handle app status
  - Change views
*/

var app = (function(){

  var state
  var status = ["setup", "respond", "success"];

  // required DOM elements
  var body = document.getElementsByTagName("body")[0];

  // initialization
  console.log('App initializated with status 0')

  // jump to step
  function toStep(newState){

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
    changeToStep: toStep
  };

})();
