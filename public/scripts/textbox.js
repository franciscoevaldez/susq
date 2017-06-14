function susTextBox (_inputID) {
  var _elem = document.getElementById(_inputID);
  var _err = document.getElementById(_inputID + '--error')

  var _errorClass = 'input--error',
      validStates = ['This field is required', 'OK'];

  // validation
  function _validate(){
    return (_elem.value) == "" ? 0 : 1
  }

  function getValidState(){
    return validStates[_validate()];
  }

  // on blur update
  function _wasBlurred(){
    // validate
    var state = _validate();
    // reset styles
    _elem.classList.remove(_errorClass);
    _err.innerHTML = ""
    // if validation fails, apply styles
    if (state != 1) {
      _elem.classList.add(_errorClass);
      _err.innerHTML = validStates[state];
    }

  };

  // listeners
  _elem.addEventListener("blur", _wasBlurred, true);

  return{
    validate : getValidState
  }

}

susTextBox.prototype = function(){



};
