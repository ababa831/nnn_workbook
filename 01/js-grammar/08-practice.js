(function () {
    'use strict';

    for (var i = 1; i < 100001; i++) {
        if (i % 15 === 0) {
            document.write('FizzBuzz ');
        } else if (i % 5 === 0) {
            document.write('Buzz ');
        } else if (i % 3 === 0) {
            document.write('Fizz ');
        } else {
            document.write(i + ' ');
        }
    }

    // 別解
    /* 
    for (var i = 1; i < 10001; i++) {
        document.write(((i % 3 ? '' : 'Fizz') + (i % 5 ? '' : 'Buzz') || i )+ ' ');
    }
    */
})();