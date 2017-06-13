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

  // bound listeners
  for (var cI = 0; cI < elements.length; cI++) {
    var elem = elements[cI].triggers;

    if (cI == 0) {

      elem.addEventListener("click", function(event){
        event.preventDefault();
        scrollToNext(event);
      } )

    } else {

      for (var radI = 0; radI < elem.length; radI++) {
        var elemToBound = elem[radI];
        elemToBound.addEventListener("click",
          function(event){
            scrollToNext(event);
          } );
      }

    }
  }

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

    console.log("scrolling to: " + i);

    if (i >= elements.length) { return }

    var targetElement = elements[i].next,
        targetScroll = targetElement.offsetTop - ( 4 * 16 );

    //window.scrollTo(0, targetScroll)
    console.log(targetScroll);
    smoothScrollTo(targetScroll)
  });

  var smoothScrollTo = (function(target){
    var currentScroll = window.scrollY,
        targetScroll = target,
        delta = targetScroll-currentScroll,
        duration = 60,
        displace = delta/duration;

    var i = setInterval(function(){
    	if (delta == 0){ return }

      currentScroll = Math.round(currentScroll + displace)
    	window.scrollTo(0,currentScroll)

        if(currentScroll >= targetScroll) {
            clearInterval(i);
        }
    }, 5);
  })

  return {
    elements : elements,
    scrollTo : scrollTo
  }

})();
