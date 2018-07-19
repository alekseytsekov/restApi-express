var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BurgerSchema = new Schema(
  {
    name: { type: String, required: true },
    //author: {type: Schema.ObjectId, ref: 'Author', required: true},
    description: { type: String, required: false, default : "" },
    price: { type: Number, required: true }
  }
);


module.exports = mongoose.model('Burger', BurgerSchema);