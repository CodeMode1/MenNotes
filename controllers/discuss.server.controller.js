var subjectModel = require('../models/discuss.server.model.js');
var subjectSchema = require('../models/discuss.server.model.js');

exports.create = function(req,res){
    var discuss = new subjectModel({
        name: req.body.name,
        numSubjects: req.body.numSubjects,
        author: req.body.author,
        createdOn: req.body.createdOn
    });


    //var subjects = { name: []};
    /*
    for(var i in req.body.i){
        //var nom = req.body.i[i];
        var nom = "test";
        subjects.name.push(nom);
    }
*/
    //var name = new subjectSchema(req.body.subjects.value);
    //subjects.push(name);
    /*
    var subjects = [];
    var name1 = { name: "test"};
    var name2 = { name: "test2"};
    subjects.push(name1, name2);
    */

    var x = JSON.parse(req.body.inputVals);
    console.log(JSON.stringify(x));

    var subjects = [];
    for (var i =0; i < x.length; i++){
        var name1 = x[i];
        console.log(name1);
        var res = { name: name1};
        subjects.push(res);
    }

    discuss.set('subjects', subjects);

    discuss.save(function(err){
        if(err)
            console.log(err);
      // else
           // res.redirect(301, '/');    
    })
};

exports.getSubject = function(req,res){
    subjectModel.find(function(err,results){
        if(err)
            console.log(err);
        else
            res.render('discuss', { title: 'subjects', subjects: results})
    });
}