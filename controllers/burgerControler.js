const tryParse = require('./../scripts/tryParse');
const Burger = require('./../models/burger');
const apiConfig = require('./../config/apiConfig');

function getDate(){

    var today = new Date();
    const year = today.getFullYear();
    const month = '0' + (today.getMonth() + 1);
    const day = '0' + today.getDate();
    const hours = '0' + today.getHours();
    const minutes = '0' + today.getMinutes();
    const seconds = '0' + today.getSeconds();
    const milliSeconds = '0' + today.getMilliseconds();

    return `${year}-${month.slice(-2)}-${day.slice(-2)} ${hours.slice(-2)}:${minutes.slice(-2)}:${seconds.slice(-2)}.${milliSeconds.slice(-2)}`;
}

module.exports = {
    getById : async (req, res) => {

        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            res.json([]);
            res.end();
            return;
        }

        try {
            //let entity = await Burger.find().where({ name: `name ${req.params.id}` });
            let entity = await Burger.findById(req.params.id);
            res.json(entity);

        } catch (e) {
            let error = {
                params : req.params,
                error : e
            }

            res.send(error);
            res.end();
        }
    },
    getAll : async (req, res) => {

        try {
            let page = tryParse(req.query.page, 1);
            page--;

            if(page < 0){
                page = 0;
            }
            
            let skip = apiConfig.MAX_RETURNED_ENTITIES * page;
            let take = apiConfig.MAX_RETURNED_ENTITIES;

            let name = req.query.name;
            let description = req.query.description;
            let priceLt = req.query.price_lt;
            let hasPriceLt = false;
            let priceGt = req.query.price_gt;
            let hasPriceGt = false;

            let filter = {};
            if(name !== null && typeof name !== 'undefined' && name.length > 0){
                filter.name = { '$regex' : name };
            }

            if(description !== null && typeof description !== 'undefined' && description.length > 0){
                filter.description = { '$regex' : description };
            }

            if(priceLt !== null && typeof priceLt !== 'undefined'){

                priceLt = parseFloat(priceLt);
                if(!isNaN(priceLt)) {
                    hasPriceLt = true;
                }
            }

            if(priceGt !== null && typeof priceGt !== 'undefined'){

                priceGt = parseFloat(priceGt);
                if(!isNaN(priceGt)) {
                    hasPriceGt = true;
                }
            }

            if(hasPriceLt && hasPriceGt){
                filter.price = { '$gt' : priceGt, '$lt' : priceLt };
            } else if(hasPriceLt) {
                filter.price = { '$lt' : priceLt };
            } else if(hasPriceGt){
                filter.price = { '$gt' : priceGt };
            }

            //let query = Burger.find(filter);

            let entities = await Burger
                            .find(filter)
                            .skip(skip)
                            .limit(take);
                            // .sort({
                            //     name: 'asc'
                            // })

            res.json(entities);

        } catch (e) {
            let error = {
                params : req.params,
                query : req.query,
                error : e,
            }

            res.send(error);
            res.end();
        }
    },
    add : async (req, res) => {

        let burger = {
            name : req.body.name,
            description : req.body.description,
            price : req.body.price
        }
        
        try {
            let result = await Burger.create(burger);

            console.log(`-->[${getDate()}] Create entity: '${result._id}'`);

            res.send('--> Burger added!');
            res.end();
        } catch (e) {
            let error = {
                formData : req.body,
                error : e
            }

            res.send(error);
            res.end();
        }
    },
    edit : async (req, res) => {

        if (!req.body.id.match(/^[0-9a-fA-F]{24}$/)) {
            res.json({ isSuccess : false, message : "Invalid id!" });
            res.end();
            return;
        }

        let burger = {};

        if(req.body.name !== null && typeof req.body.name !== 'undefined' && req.body.name.length > 0){
            burger.name = req.body.name;
        }

        if(req.body.description !== null && typeof req.body.description !== 'undefined' && req.body.description.length > 0){
            burger.description = req.body.description;
        }

        if(req.body.price !== null && typeof req.body.price !== 'undefined'){

            let price = parseFloat(req.body.price);
            if(!isNaN(price) && price > 0) {
                burger.price = req.body.price;
            }
        }

        const filter = { 
            _id: req.body.id
        }; 

        const options = {
            upsert: false, // if not exist ... create
            new: true, //show updated result
            runValidators: true // run validators
        };

        let result = await Burger.findOneAndUpdate(filter, burger, options);

        console.log(`-->[${getDate()}] Edit entity: '${req.body.id}'`);

        res.json(result);
        res.end();
    },
    delete : async (req, res) => {

        if (!req.body.id.match(/^[0-9a-fA-F]{24}$/)) {
            res.json({ isSuccess : false, message : "Invalid id!" });
            res.end();
            return;
        }

        let filter = {
            _id : req.body.id
        }

        let result = await Burger.deleteOne(filter);

        console.log(`-->[${getDate()}] Delete entity: '${req.body.id}'`);

        res.json({ isSuccess : true });
        res.end();
    }
};