
var questions = document.querySelectorAll(".question");

var answers =[];
var questionNames = ['q1','q2','q3','q4','q5','q6','q7','q8','q9','q10'];

fetch('/game/startQuiz/').then((res)=>{
	return res.json();
})
.then((json)=>{
	var quizData = json;
	questions.forEach((question, index)=>{
		question.innerHTML = `<span class="qText">${quizData[index].question}</span>
	  	<ul>
	  		<input type="radio" name="q${index+1}" value='${quizData[index].answer1}' id='q${index+1}a'><label for='q${index+1}a'>${quizData[index].answer1}</label><br/>
	  		<input type="radio" name="q${index+1}" value='${quizData[index].answer2}' id='q${index+1}b'><label for='q${index+1}b'>${quizData[index].answer2}</label><br/>
	  		<input type="radio" name="q${index+1}" value='${quizData[index].answer3}' id='q${index+1}c'><label for='q${index+1}c'>${quizData[index].answer3}</label><br/>
	  		<input type="radio" name="q${index+1}" value='${quizData[index].answer4}' id='q${index+1}d'><label for='q${index+1}d'>${quizData[index].answer4}</label><br/>
	  	</ul>`
	})
		questionNames.forEach(getRadiobyName);
})

function getRadiobyName(radioName){
	var indexString = radioName[1];
	if(radioName[1] === "1" && radioName[2]){
		indexString = '10';
	}
	var answerIndex = Number(indexString) - 1;
	var radioButtons = document.querySelectorAll(`input[name=${radioName}]`);
	radioButtons.forEach(function(radio){
		radio.addEventListener('click',function(){
			answers[answerIndex] = this.value;
		})
	})
}











