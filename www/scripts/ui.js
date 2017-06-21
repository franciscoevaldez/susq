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

  // Start button
  btnStart.addEventListener("click", function(event){

    /* Should validate step 0 inputs, store
     the new questionnaire and advance to next step */

    event.preventDefault();
    var isTitleValid = ui.title.isValid(),
        isEmailValid = ui.email.isValid();

    if ((!isTitleValid) || (!isEmailValid)) { return }

    app.changeToStep(1);

  }, true);

  // Respond button
  btnRespond.addEventListener('click', function(event){
    /* Should validate name and scroll to first question */
    event.preventDefault();

    if( !(ui.name.isValid()) ){
      window.alert("Please don't forget your name")
      return
    };

    scrollManager.scrollTo(0);
  });

  // Send response button
  btnSend.addEventListener("click", function(event){
    /* Should validate user name, all answers, request score,
     send the response to server and move to the next step */

    event.preventDefault();
    // validation
    var isNameValid = ui.name.isValid(),
        responses   = app.getResponses(),
        isFormValid = true;

    if (!isNameValid) { isFormValid = false }
    for (var i = 0; i < 10; i++) {
      if( !((responses[i]>=0) && (responses[i]<=4)) ) { isFormValid = false }
    }

    if (!isFormValid) {
      window.alert('It seems some answer is missing, please answer all questions and try again.');
      return
    }

    // get answer json from app
    var answer = app.getJSON();

    // send response

    // advance to thank you
    console.log(answer);
    app.changeToStep(2);

  })

  // inputs ---------------------------------------------
  // Title input
  var titleInput = new susTextBox('input--title', false);

  // Name input
  var nameInput = new susTextBox('response--name', false);

  // Email input
  var emailInput = new susTextBox('input--email', function(_value){
    if (_value == "") {
      return {valid: false, message: false}     // email validation 1: should not be empty
    } else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(_value))) {
      return {valid: false, message: "Please enter a valid email"}  // email validation 2: should match the email pattern
    } else {
      return {valid: true, message: false} // otherwise is valid
    }
  });

  // radio buttons ---------------------------------------------
  var scaleSets = [];

  // get radiosets
  for (var i = 0; i < 10; i++) {
    scaleSets[i] = new susScaleSet( ('q'+i) );
  }
  
  // Keypresses
  document.onkeypress = function(e) {
    var event = e || window.event;
    var charCode = event.which || event.keyCode;

    if ( charCode == '13' ) {
      // Enter pressed
	    console.log('pressed')
      return false;
    }
  }

  return {
    title   : titleInput,
    email   : emailInput,
    name    : nameInput,
    scales  : scaleSets
  }

})();
