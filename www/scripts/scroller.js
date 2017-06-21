// Radio buttons & auto-scrolling
var scrollManager = (function(){

  var targets = [];

  // get scroll targets
  for (var i = 0; i < 11; i++) {
    var newTargetID  = "question--" + i;
    if (i == 10) { newTargetID = "scr--send" }
    targets[i] = document.getElementById(newTargetID);
  }

  // get index for element
  function getIndexForElement(anElement){
    for (var elI = 0; elI < targets.length; elI++) {
      var trigger = ui.scales[elI].radios;

      // check first button
      if (anElement === trigger) {
        return elI
      }

      // check radio buttons
      if (trigger[1]) {
        var radioGroup = trigger;

        for (var rgI = 0; rgI < radioGroup.length; rgI++) {
          if(anElement === radioGroup[rgI]){
            return elI;
          }
        }

      }

    }
  }

  function scrollToNext(event){
    var calledElement = event.srcElement;           
    var index = getIndexForElement(calledElement);    // get index for called element
    scrollToElementWithIndex(index + 1);              // scroll to next index
  }

  // scroll to element with index
  var scrollToElementWithIndex = (function(i){
    if (i >= targets.length) { return }      // abort if there is no target

    var targetElement = targets[i];
    smoothScrollToPosition( targetElement.offsetTop - ( 4 * 16 ) )
  });

  // smooth scroll to pixel position
  var smoothScrollToPosition = (function(target){

    var sP = window.scrollY,    // Starting Point
        tP = target,            // Target Point
        tD = tP - sP,           // Total displacement
        fr = 60,                // Frame number
        aIdx = 0;               // Animation index

    var i = setInterval(function(){
    	if (tD == 0){ return }                 // Abort if no displacement

      var dIdx = aIdx/fr;                   // Distorted Animation index
          dIdx = dIdx<.5 ? 4*dIdx*dIdx*dIdx : (dIdx-1)*(2*dIdx-2)*(2*dIdx-2)+1;
      var delta = Math.round(tD * dIdx),    // delta = total displacement * distorted index
          scroll = sP + delta;              // current scroll is tD*dIdx + starting point
    	window.scrollTo(0,scroll)             // run the scroll
      if(dIdx == 1) { clearInterval(i); }   // if animation index = 1, end loop

      aIdx++;
    }, 5);
  })

  return {
    targets : targets,
    scrollTo : scrollToElementWithIndex,
    scrollToNext : scrollToNext
  }

})();
