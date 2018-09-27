(function () {
    'use strict';
    var age = 16;
    var result = null;
    if (age >= 20) {
        result = '成年';
    } else {
        result = '未成年';
    }
    document.write(result);

    age = 65;
    var isMale = false;
    var reuslt = null;
    if (age >= 60 && !isMale) {
        result = '割引の対象です';
    } else {
        reuslt = '割引の対象ではありません';
    }
    document.write(`<p>${result}</p>`)
})();