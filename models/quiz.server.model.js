var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// pre define sub documents
var subCategory = new Schema({
    name: String,
    description: String,
    isActive: Boolean
});

var subAnswers = new Schema({
    answerText: String,
    isCorrect: Boolean,
    displayOrder: Number
});

var subQuestions = new Schema({
    questionType: String,
    questionText: String,
    answers: [ subAnswers ]
});

// define main document Schema
var quizSchema = new Schema({
    name: String,
    description: String,
    categories: [ subCategory ],
    questions: [ subQuestions ]
});

// documents are instances of models
var Quiz = mongoose.model('Quiz', quizSchema);

var quiz1 = new Quiz({
    name: 'FAvorite things quiz',
    description: 'Demo quiz',
    categories: [{
        name: 'Favorites',
        description: 'favorite things quiz category',
        isActive: true
    }]
});

//save document
quiz1.save(callback);

// or
var categories = [];
// fill in the categories array
var cat1 = { name: 'test1', description: 'test 1 category', isActive: true};
var cat2 = { name: 'test2', description: 'test 2 category', isActive: true};

categories.push(cat1, cat2);

var questions = [];
// add questions and answers
var q1 = { type: 'multiple-choice', text: 'what is your favorite color?', 
    answers: [
        { answerText: 'red', isCorrect: false, displayOrder: 1},
        { answerText: 'white', isCorrect: false, displayOrder: 2},
        { answerText: 'blue', isCorrect: true, displayOrder: 3}
    ]};

    questions.push(q1);

    var quiz2 = new Quiz({
        name: 'example quiz',
        description: 'example quiz',
        categories: categories,
        questions: questions
    });

    quiz2.save(callback);