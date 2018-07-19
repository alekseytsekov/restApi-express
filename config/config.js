'use strict'

const common = require('./common');
const handlebar = require('./handlebar');
const mongoDb = require('./mongoDb');

//const apiConfig = require('./apiConfig');

// let config = {};
// const configArr = [ common,
//                     handlebar,
//                     mongoDb,
//                     apiConfig];

// configArr.forEach((cfg) => {
//     config = Object.assign(config, cfg);
// });

//module.exports = config;

module.exports = Object.assign({}, common,  handlebar,  mongoDb);