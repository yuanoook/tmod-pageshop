template.helper('$getNum', function (num) {
    var newNum = 0;
    if (num > 0 && num < 10000) {
        newNum = num;
    } else if (num >= 10000 && num < 99999) {
        newNum = (num / 10000).toFixed(1) + '万';
    } else {
        newNum = (num / 10000).toFixed(0) + '万';
    }
    return newNum;
});
template.helper('$date', function (num) {
    var date = window.lib.hkPublic.dateFormat(num, '/');
    return date;
});
template.helper('$datetime', function (num) {
    num = Number(num);
    var date = window.lib.hkPublic.dateFormat(num, '/', true);
    return date;
});

template.helper('$cardNum', function (num) {
    var len = num.length;
    var newNum = num.substr(0, len-8) + '****' + num.substr(len-4, len);
    return newNum;
});

template.helper('$sex', function (num) {
    if(num === 0) {
        return '男'
    } else {
        return '女'
    }
});




