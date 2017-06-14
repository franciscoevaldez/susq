function susTextBox (_inputID, _customValidation) {
  var _elem = document.getElementById(_inputID);
  var _err = document.getElementById(_inputID + '--error')

  var _errorClass = 'input--error';
      //validStates = ['This field is required', 'OK'];

  // validation
  function _validate(){

    var state = {};

    if (_customValidation) {
      // custom validation: run function (passing value as argument)
      state = _customValidation(_elem.value);
    } else {
      // common validation: return false if empty
      if (_elem.value == "") {
        state = {valid: false, message: false}
      } else {
        state = {valid: true, message: false}
      }
    }

    // catch standard empty and success messages
    state.message = (state.message == false && state.valid == true) ? "OK" : state.message;
    state.message = (state.message == false && state.valid == false) ? "This field is required" : state.message;

    _updateUIforState(state);

    return state;

  }

  function _updateUIforState(_state){

    // reset styles
    _elem.classList.remove(_errorClass);
    _err.innerHTML = ""
    // if validation fails, apply styles
    if (_state.valid == false) {
      _elem.classList.add(_errorClass);
      _err.innerHTML = _state.message;
    }

  }

  function getValidState(){
    var state = _validate();
    return state.valid;
  }

  // on blur update
  function _wasBlurred(){
    var state = _validate();   // validate
  };

  // listeners
  _elem.addEventListener("blur", _wasBlurred, true);

  return{
    isValid : getValidState,
    value : _elem.value
  }

}
