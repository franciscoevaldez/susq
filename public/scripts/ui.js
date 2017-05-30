// view controller
/*  This file will:
    - handle ui interactions
*/

// get elements that carry interactions
var btnStart = document.getElementById('btn--start');

function _btnStartWasPressed(){
  app.changeToStep(1);
}

btnStart.addEventListener("click", _btnStartWasPressed, true);
