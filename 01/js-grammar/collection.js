(function () {
    'use strict';

    var classes = ['A組', 'B組', 'C組', 'D組'];
    var maxGrade = 3

    for (var grade = 1; grade <= maxGrade; grade++) {
        for (var i = 0; i < classes.length; i++) {
            // <p>hoge年hage組</p>という文字列を作る
            document.write(`<p>${grade}年${classes[i]}</p>`);
        }
    }
})();