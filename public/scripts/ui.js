// view controller
/*  This file will:
    - handle ui interactions              ui.js
    - show and hide error messages        ui.js
*/

var ui = (function(){

  // buttons ---------------------------------------------
  var btnStart    = document.getElementById('btn--start'),
      btnRespond  = document.getElementById('btn--respond'),
      btnSend     = document.getElementById('btn--send');

  // Start button (step 0)
  /* Should validate step 0 inputs, store
     the new questionnaire and advance to next step */
  btnStart.addEventListener("click", function(event){

    event.preventDefault();
    var setupValidation = validateSetup.all();
    if (!setupValidation.isValid) {
      setupValidation.title()
      setupValidation.mail()
      return
    }


    app.changeToStep(1);

  }, true);

  // Respond button (step 1)
  /* Should validate name and scroll to first question */

  // Send response button (step 1)
  /* Should validate user name, all answers, request score,
     send the response to server and move to the next step */
  btnSend.addEventListener("click", function(event){

    event.preventDefault();
    // validation comes here
    var result = app.getResult();
    var responses = app.getResponses();

    var text = "Responses are ready: \n";

    for (var i = 0; i < responses.length; i++) {
      text += "Question " + i + ": " + responses[i] + "\n";
    }

    text += '\n';
    text += 'FINAL SCORE: ' + result;

    window.alert(text);

  })



})()


// inputs ---------------------------------------------
var uiTitleInput = (function(){

  // elements
  var input = document.getElementById('input--title'),
      errorSpan = document.getElementById('input--title--error');
  // properties
  var errorClass = "input--error",
      validStates = ['This field is required', 'OK'];

  // validation
  function _validate(){
    return (input.value) == "" ? 0 : 1
  }

  function getValidState(){
    return validStates[_validate()];
  }

  // on blur update
  function _wasBlurred(){
    // validate
    var state = _validate();
    // reset styles
    input.classList.remove(errorClass);
    errorSpan.innerHTML = ""
    // if validation fails, apply styles
    if (state != 1) {
      input.classList.add(errorClass);
      errorSpan.innerHTML = validStates[state];
    }

  }

  // listeners
  input.addEventListener("blur", _wasBlurred, true);

  return{
    validate : getValidState
  }

})();

var uiEmailInput = (function(){

  // elements
  var input = document.getElementById('input--email'),
      errorSpan = document.getElementById('input--email--error');
  // properties
  var errorClass = "input--error",
      validStates = ['This field is required', 'OK', 'Please enter a valid email address'];

  // validation
  function _validate(){
    var value = input.value
    // mail should not be empty
    if(value == ''){ return 0 }
    // mail should follow this pattern
    if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value))){ return 2 }
    // if so, it is valid
    return 1
  }

  function getValidState(){
    return validStates[_validate()];
  }

  // on blur update
  function _wasBlurred(){
    // validate
    var state = _validate();
    // reset styles
    input.classList.remove(errorClass);
    errorSpan.innerHTML = ""
    // if validation fails, apply styles
    if (state != 1) {
      input.classList.add(errorClass);
      errorSpan.innerHTML = validStates[state];
    }

  }

  // listeners
  input.addEventListener("blur", _wasBlurred, true);

  return{
    validate : getValidState
  }

})();
