// view controller
/*  This file will:
    - handle ui interactions              ui.js
    - show and hide error messages        ui.js
*/

var ui = (function(){

  // buttons ---------------------------------------------
  var btnStart = document.getElementById('btn--start');
  var btnSend = document.getElementById('btn--send');

  // Start button (step 0)
  /* Should validate step 0 inputs, store
     the new questionnaire and advance to next step */
  btnStart.addEventListener("click", function(){

    var setupValidation = validateSetup.all()
    if (!setupValidation.isValid) {
      setupValidation.title()
      setupValidation.mail()
      return
    }


    app.changeToStep(1);

  }, true);

  // Send response button (step 1)
  /* Should validate user name, all answers,
     send the response to server and move to the next step */



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
