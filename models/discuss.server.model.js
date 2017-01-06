var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var numCharach = [
    function(val){
        return val.length !=0 && val.length < 50;
    },
    // custom error text
    'invalid name'
];

var subjectSchema = new Schema({
    name: String
});

var discussSchema = new Schema({
    name: { type: String, required: true, validate: numCharach},
    numSubjects: {type: Number, required: true},
    author: { type: String, required: true},
    createdOn: {type: Date, default: Date.now, required: true},
    subjects: [subjectSchema]
});

module.exports = mongoose.model('discuss', discussSchema);