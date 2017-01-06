var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// string - enum validator example
var impediments = ['none', 'minor', 'blocking', 'severe'];

// custom validation - method signature = validate(obj, [errorMessage])
var sizeValidator = [
    function(val){
        return (val.length > 0 && val.length <= 50)
    },
    //custom error text
    'String must be between 1 and 50 characters long'];

var memberNameValidator = [
    function(val){
        return (val.length > 0 && val.toLocaleLowerCase() != 'none')
    },
    //custom error text
    'select a valid member name'];

var requiredStringValidator = [
    function(val){
        var testVal = val.trim();
        return (testVal.length > 0)
    },
    //custom error text
    '{PATH} cannot be empty'];

var standupSchema = new Schema({
    memberName: { type: String, required: true, validate: memberNameValidator},
    project: { type: String, required: true, validate: memberNameValidator},
    workYesterday: { type: String, required: true, validate: sizeValidator, memberNameValidator,requiredStringValidator},
    workToday: { type: String, required: true, validate: sizeValidator, memberNameValidator,requiredStringValidator},
    impediment: { type: String, required:true, enum: impediments, default: 'none',validate : requiredStringValidator},
    createdOn: { type: Date, required: true, default: Date.now }
});

// export (expose) the model now to other files who include or may require this model
module.exports = mongoose.model('Standup', standupSchema);

// example of using schema.add

var includeMiddleName = true;

var exampleSchema = new Schema;

if(includeMiddleName){
    exampleSchema.add({
        memberName:{
            first: String,
            middle: String,
            last: String
        }
    });
}else{
    exampleSchema.add({
        memberName:{
            first: String,
            last:String
        }
    });
}

// fields to add anyway
exampleSchema.add({
    project: String,
    workYesterday: String,
    workToday: String,
    impediment: String,
    createdOn: { type: Date, default: Date.now}
});