// Radio buttons & auto-scrolling
var scrollManager = (function(){

  var elements = [];

  // get triggers and next targets
  for (var i = 0; i < 11; i++) {
    var newTriggerID = "q" + (i-1),
        newTargetID  = "question--" + i,
        newTrigger   = [];

    // get first case
    if (i == 0) {
      newTriggerID = "btn--respond";
      newTrigger   = document.getElementById(newTriggerID);
    } else {
      if (i == 10) { newTargetID = "scr--send" }
      newTrigger  = document.getElementsByName(newTriggerID);
    }

    elements[i] = {
      triggers : newTrigger,
      next     : document.getElementById(newTargetID)
    }

  }

  // bound listeners for radio buttons
  for (var cI = 1; cI < elements.length; cI++) {
    var elem = elements[cI].triggers;

    for (var radI = 0; radI < elem.length; radI++) {
      var elemToBound = elem[radI];
      elemToBound.addEventListener("click",
        function(event){
          scrollToNext(event);
        } );
    }

  }

  // get index for element
  function getIndexForElement(anElement){
    for (var elI = 0; elI < elements.length; elI++) {
      var trigger = elements[elI].triggers;

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
    // get index for called element
    var index = getIndexForElement(calledElement);
    // scroll to next index
    scrollTo(index);
  }

  // scroll function
  var scrollTo = (function(i){
    if (i >= elements.length) { return }      // abort if there is no target

    var targetElement = elements[i].next;
    smoothScrollTo( targetElement.offsetTop - ( 4 * 16 ) )

  });

  var smoothScrollTo = (function(target){

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

      if(dIdx == 1) { clearInterval(i); }   // if anmimation index = 1, end loop

      aIdx++;
    }, 5);
  })

  return {
    elements : elements,
    scrollTo : scrollTo
  }

})();
