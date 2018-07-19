'use strict'

// required environment variables
const environmentVariables = [
    'NODE_ENV',
    'PORT'
]

environmentVariables.forEach((name) => {
    if (!process.env[name]) {
        throw new Error(`Environment variable ${name} is missing`)
    }
});

const config = {
    env: process.env.NODE_ENV || 3000,
    logger: {
        level: process.env.LOG_LEVEL || 'info',
        enabled: process.env.BOOLEAN ? process.env.BOOLEAN.toLowerCase() === 'true' : false
    },
    server: {
        port: Number(process.env.PORT)
    },
    mongoDbOptions : {
        connection : 'mongodb://127.0.0.1/burgerDb'
    }
    // ...
}

module.exports = config;