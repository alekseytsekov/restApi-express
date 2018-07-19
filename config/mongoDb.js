//Import the mongoose module
const mongoose = require('mongoose');
const Burger = require('./../models/burger');
const MAX_BURGERS_TO_SEED = 10;

const mongoDb = {
    mongoDbInit : (option) => {

        //Set up default mongoose connection
        //const mongoDB = 'mongodb://127.0.0.1/burgerDb';
        mongoose.connect(option.connection);
        // Get Mongoose to use the global promise library
        mongoose.Promise = global.Promise;
        //Get the default connection
        var db = mongoose.connection;

        //Bind connection to error event (to get notification of connection errors)
        db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    },
    mongoDbSeed : async () => {

        let numOfBurgers = await Burger.countDocuments();
        console.log(`==> Number of seeded burgers: ${numOfBurgers}`);
        if(numOfBurgers === 0){
            for (let i = 0; i < MAX_BURGERS_TO_SEED; i++) {
                let burger = {
                    name : `name ${i}`,
                    description : `description ${i}`,
                    price : getRandomArbitrary(0.5, 11)
                }
                
                let result = await Burger.create(burger);
                console.log(result);
            }
            
            console.log(`--> Successfully seed ${MAX_BURGERS_TO_SEED}!`);
        } else {
            console.warn('--> Burgers already seeded!');
        }
    }
}

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

module.exports = mongoDb;