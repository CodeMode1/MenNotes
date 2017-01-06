var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// child address Schema
var addressSchema = new Schema({
    type: { type: String, required: true},
    street: String,
    city: String,
    state: String,
    country: String,
    postalCode: Number
});

// parent customer Schema
var reMatch = /[a-zA-Z]/;
var customerSchema = new Schema({
    name: {
        first: String,
        last: String,
        type: String,
        required: true,
        match: reMatch
    },
    address: [ addressSchema ],
    createdOn: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true },
    discount: { type: Number, min: 5, max: 60}
});

//after the schema is defined, path is field name
customerSchema.path('city').required(true, 'Oops! Supply a city');

//build a model from the customer Schema
var Customer = mongoose.model('Customer', customerSchema);

// add a custom property to the Schema
customerSchema.add({ discountCode: String});

var DiscountedCust = mongoose.model('DiscountCust', customerSchema);

// mongoose data type
// String, Number, Date, Buffer, Boolean, Mixed, ObjectId, Array
// built-in validators: required for all of them