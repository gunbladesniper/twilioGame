// for part one multiple choice - https://opentdb.com/api.php?amount=10&difficulty=medium&type=multiple
var express = require('express');
var app = express();
const path= require('path');
var bodyParser = require('body-parser');
var axios = require('axios');
var config = require('./config');

// var shuffle = require('shuffle-array');

var gameRouter = require('./gameRouter');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../client')));

app.use('/game', gameRouter);


// app.get("/",(req,res)=>{

// })

app.post("/putnum", (req,res)=>{
	exports.userNumber = req.body['Phone Number'];
	res.redirect('/quiz');
})

app.get("/quiz", (req,res)=>{
	res.sendFile(path.join(__dirname,'../client/quizPage/multipleChoice.html'))
})

app.get('/voiceQuestion',(req, res)=>{
	res.sendFile(path.join(__dirname,'../client/quizPage/voiceQuestion.html'));
})

app.get('/end', (req, res)=>{
	res.sendFile(path.join(__dirname,'../client/quizPage/thanksFor.html'));
})


app.listen(3000, function(){
	console.log('Listening on port 3000');
})

