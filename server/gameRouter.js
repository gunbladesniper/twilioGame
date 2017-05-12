var express = require('express');
var gameRouter = express.Router();
var axios = require('axios');
var config = require('./config');
var path = require('path');
var shuffle = require('shuffle-array');

var userNumber= require('./server');
var twilio = require('twilio');
var client = new twilio(config.twilio.accountSid, config.twilio.authToken);



var multipleChoiceGameState = {};
var multipleChoiceAnswers=[];
var score = 0;
var voiceGameState = {};
var voiceAnswer;


function turnIntoArr(obj){
	var results =[];
	for(var key in obj){
		if(key !== 'submit'){
			var indexString = key[1];
			if(key[1] === "1" && key[2]){
			indexString = '10';
			}
			var answerIndex = Number(indexString) - 1;
			results[answerIndex] = obj[key];
			}
		}
	return results;
};

gameRouter.get('/startQuiz', (req, res)=>{
	axios.get('https://opentdb.com/api.php?amount=10&difficulty=medium&type=multiple')
	.then((response)=>{
		response.data.results.forEach((question, index)=>{
			let answers = question.incorrect_answers.slice();
			multipleChoiceAnswers[index] = question.correct_answer;
			answers.push(question.correct_answer);
			shuffle(answers);
			multipleChoiceGameState[index] = {
				question: question.question,
				answer1: answers[0],
				answer2: answers[1],
				answer3: answers[2],
				answer4: answers[3]
			}
		})
		res.send(JSON.stringify(multipleChoiceGameState));
	})
	.catch((err)=>{
		throw new Error(err);
	})
});

gameRouter.post('/scoreQuiz',(req, res)=>{
	var submittedAnswers = turnIntoArr(req.body);
	for(var i = 0; i< multipleChoiceAnswers.length; i++){
		if(submittedAnswers[i] == multipleChoiceAnswers[i]){
			score+=3;
		}
	}
	res.redirect('/voiceQuestion');
});

gameRouter.get('/startVoice', (req, res)=>{
	axios.get('https://opentdb.com/api.php?amount=1&difficulty=hard&type=multiple').then((response)=>{
		var question = response.data.results[0].question;
		let answers = response.data.results[0].incorrect_answers.slice();
		answers.push(response.data.results[0].correct_answer);
		shuffle(answers);
		voiceAnswer = response.data.results[0].correct_answer[0];
		var questionArr = response.data.results[0].question.split(' ');
			voiceGameState[0] = {
				answer1: answers[0],
				answer2: answers[1],
				answer3: answers[2],
				answer4: answers[3]
			}
		client.calls.create({
			url:"https://handler.twilio.com/twiml/EHa5e6c21f02085f6095f9acf3f9f156b7?message=" + questionArr,
			to: config.numbers.myNumber,
			from: config.numbers.twilioNumber
		},function(err, call){
			if(err){
				console.log(err);
			}else{
				console.log(call.sid)
				res.send(JSON.stringify(voiceGameState));
			}
		})
			// res.send(JSON.stringify(voiceGameState));
	})
})

gameRouter.post('/giveScore', (req, res)=>{
	var userAnswer = req.body.q1;
	if(voiceAnswer === userAnswer ){
		score+=20;
	}
	client.messages.create({
		to: config.numbers.myNumber,
		from: config.numbers.twilioNumber,
		body:`Your Score is ${score} out of 50. Thanks for playing!`
	}, function(err, message){
		if(err){
			console.log(err);
		}else{
			console.log(message.sid);
			res.redirect('/end')
		}
	})

})


module.exports = gameRouter;