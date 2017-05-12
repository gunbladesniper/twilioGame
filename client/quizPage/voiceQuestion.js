var questions = document.querySelectorAll(".question");
var radios = document.querySelectorAll("input[name=q1]")



fetch('/game/startVoice').then((res)=>{
	return res.json();
})
.then((json)=>{
	var voiceData = json;
	questions.forEach((question, index)=>{
		question.innerHTML = `<span class="qText">Answer the question asked from the call</span>
	  	<ul>
	  		<input type="radio" name="q${index+1}" value='${voiceData[index].answer1}' id='q${index+1}a'><label for='q${index+1}a'>${voiceData[index].answer1}</label><br/>
	  		<input type="radio" name="q${index+1}" value='${voiceData[index].answer2}' id='q${index+1}b'><label for='q${index+1}b'>${voiceData[index].answer2}</label><br/>
	  		<input type="radio" name="q${index+1}" value='${voiceData[index].answer3}' id='q${index+1}c'><label for='q${index+1}c'>${voiceData[index].answer3}</label><br/>
	  		<input type="radio" name="q${index+1}" value='${voiceData[index].answer4}' id='q${index+1}d'><label for='q${index+1}d'>${voiceData[index].answer4}</label><br/>
	  	</ul>`
	})
})