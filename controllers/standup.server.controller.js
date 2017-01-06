var Standup = require('../models/standup.server.model.js');

exports.list = function(req,res){
    var query = Standup.find();

    query.sort({ createdOn: 'desc'})
        .limit(12)
        .exec(function(err, results){
            if(err){
                console.log(err)
            };  
            res.render('index', {title: 'standup-list', notes: results});
        });
}

exports.create = function(req, res){
    var entry = new Standup({
        memberName: req.body.memberName,
        project: req.body.project,
        workYesterday: req.body.workYesterday,
        workToday: req.body.workToday,
        impediment: req.body.impediment
    });

    entry.save(function(err){
        if(err){
           var errMsg = 'sorry, there was an error saving the stand up meeting note. ' + err;
           res.render('newnote', { title: 'standup new note(error)', message: errMsg});
        }
        else{
            console.log('your person was saved');
            // redirect to home page
            res.redirect(301, '/');
        }
    });
};

exports.getNote = function(req,res){
    res.render('newnote', {title: 'standup - new note'});
}

exports.getNoteMary= function(req,res){
    Standup.find({ memberName: 'Mary'}, function(err, results){
        if(err){
            console.log(err);
        }
        res.render('index', {title: 'mary', notes:results});
    });
}

exports.getNoteByName = function(req,res){
    member = req.body.memberName;
    var query = Standup.find();
    Standup.find({ memberName: member}, function(err, results){
        if(err){
            console.log(err);
        }
        if(results.length > 0)
            res.render('index', { title: 'member', notes: results});
        else
           query.exec(function(err,results){
               res.render('index', { title: 'standup list', notes:results})
           });
    });
}

/*
    exports.filterByMember = function(req,res){
        // not exec the query right away
        var query = Standup.find();
        var filter = req.body.memberName;

        query.sort({ created: 'desc'});

        if (filter.length > 0){
            query.where({ memberName: filter})
        }

        query.exec(function(err, results){
            res.render('index', { title: 'santdup -lsit', notes: results})
        });
    };
*/