var express = require('express');
var router = express.Router();
var standupCtrl = require('../controllers/standup.server.controller.js');
var discussCtrl = require('../controllers/discuss.server.controller.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express'});
  return standupCtrl.list(req,res);
});

router.post('/', function(req,res){
  return standupCtrl.getNoteByName(req,res);
});

// get new note page
router.get('/newnote', function(req,res){
  return standupCtrl.getNote(req,res);
});

// post new note page
router.post('/newnote', function(req,res){
  return standupCtrl.create(req,res);
});

router.get('/discuss', function(req,res){
  return discussCtrl.getSubject(req,res);
});

router.post('/discuss', function(req,res){
  return discussCtrl.create(req,res);
})


module.exports = router;
