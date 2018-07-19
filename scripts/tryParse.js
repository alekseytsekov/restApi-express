module.exports = (str,defaultValue) => {
    var retValue = defaultValue;
    if(str !== null && typeof str !== 'undefined') {
        if(str.length > 0) {
            if (!isNaN(str)) {
                retValue = parseInt(str);
            }
        }
    }

    return retValue;
}