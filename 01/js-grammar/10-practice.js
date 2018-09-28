(function () {
    'use strict';

    const circleRatio = 3.14
    function calcArea(radius) {
        return radius * radius * circleRatio;
    }

    var radiusArray = [5, 10, 15];
    for (var i = 0; i < radiusArray.length; i++) {
        var tmpRadius = radiusArray[i];
        document.getElementById(`circle-area-${tmpRadius}`).innerText
            = `半径${tmpRadius}の面積は${calcArea(tmpRadius)}cm^2です．`;
    }

})();