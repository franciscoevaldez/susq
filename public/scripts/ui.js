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
    var isTitleValid = ui.title.isValid(),
        isEmailValid = ui.email.isValid();

    if ((!isTitleValid) || (!isEmailValid)) { return }

    app.changeToStep(1);

  }, true);

  // Respond button (step 1)
  /* Should validate name and scroll to first question */

  // Send response button (step 1)
  /* Should validate user name, all answers, request score,
     send the response to server and move to the next step */
  btnSend.addEventListener("click", function(event){

    event.preventDefault();
    // validation

    // get answer json from app
    var answer = app.getJSON();

    // send response

    // advance to thank you

    console.log(answer);
    window.alert("sent!");

  })

  // inputs --------------------------------------------------------------------
  var titleInput = new susTextBox('input--title', false);
  var emailInput = new susTextBox('input--email', function(_value){
    if (_value == "") {
      return {valid: false, message: false}     // email validation 1: should not be empty
    } else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(_value))) {
      return {valid: false, message: "Please enter a valid email"}  // email validation 2: should match the email pattern
    } else {
      return {valid: true, message: false} // otherwise is valid
    }
  });
  var nameInput = new susTextBox('response--name', false);


  return {
    title : titleInput,
    email : emailInput,
    name  : nameInput
  }

})();
