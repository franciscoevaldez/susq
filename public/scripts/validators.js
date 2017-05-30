// input validation
/*  This file will:
    - handle setup validation
    - handle response validation
*/

// setup validation
var validateSetup = (function() {

  // catch objects
  var inputTitle = document.getElementById('input--title'),
      inputEmail = document.getElementById('input--email');

  // title validation: should never be empty
  function validateTitle(){

    var titleValue = inputTitle.value,
        validState, validMessage;

    if (titleValue == "") {
      validState = false;
      validMessage = "Required";
    } else {
      validState = true;
      validMessage = "OK";
    }

    return {
      state : validState,
      message : validMessage
    }

  }

  function validateMail(){

    var mailValue = inputEmail.value,
        validState, validMessage;

    if (mailValue == "") {
      // email validation 1: should not be empty
      validState = false;
      validMessage = "Required";
    } else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mailValue))) {
      // email validation 2: should be valid
      validState = false;
      validMessage = "Invalid email";
    } else {
      // otherwise is valid
      validState = true;
      validMessage = "OK";
    }

    return {
      state : validState,
      message : validMessage
    }

  }

  function validateAll(){
    var title = validateTitle(),
        mail = validateMail(),
        state, message;

    if (title.state && mail.state) {
      state = true;
    } else {
      state = false;
    }

    message = "Title: " + title.message + ", mail: " + mail.message;

    return {
      state : state,
      message : message
    }

  }

  inputTitle.addEventListener("blur", validateTitle, true);


  return{
    title : validateTitle,
    mail : validateMail,
    all : validateAll
  }

})();
