const momentTZ = require('moment-timezone');

// Config
const { constants } = require("./config");

exports.convertLocalDate = (time, format) => {

    if (time) {
        if (format) return momentTZ(time).tz(constants.TIMEZONE).format(format);

        return momentTZ(time).tz(constants.TIMEZONE).format();
    }
    if (format) {
        return momentTZ().tz(constants.TIMEZONE).format(format);
    }
    return momentTZ().tz(constants.TIMEZONE).format();
}
exports.getObjectID = (id = null) => (new require('mongodb').ObjectID(id));