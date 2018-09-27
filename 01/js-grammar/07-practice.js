(function () {
    'use strict';

    var age = 16;
    var sex = 'female';
    var ticketPrice = null;
    if (age <= 15) {
        ticketPrice = 800;
    } else if (sex === 'female') {
        ticketPrice = 1000;
    } else {
        ticketPrice = 1800;
    }
    document.write(`チケットの価格は ${ticketPrice} 円です．`)

})();