function susScaleSet (_setID) {
    var scaleSet = document.getElementsByName(_setID);
    
    // get radio buttons in set
    for (var radI = 0; radI < scaleSet.length; radI++) {
        var aRadioBtn = scaleSet[ radI ];

        aRadioBtn.addEventListener("click",
            function(event){
                scrollManager.scrollToNext(event);
            } 
        );

    }
    
    return{
        radios : scaleSet
    }
    
}
