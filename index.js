let state = {
	currentQuestion:0,
	correctAnswersCount:0
};

const questions = [
{
		pictures:"http://res.cloudinary.com/thcloud/image/upload/v1497998294/pexels-photo-69433_zfddzk.jpg",
		answers: [
			"Husky",
			"Shiba Inu",
			"Grey Hound",
			"Samoyed"
		],
		correctAnswer:"Husky"
	},
	{
		pictures:"http://res.cloudinary.com/thcloud/image/upload/v1498000998/wildlife-photography-pet-photography-dog-animal-159541_oemol3.jpg",
		answers: [
			"Labrador",
			"Golden(?) Retriever",
			"Coco Puffy Baby Boo",
			"Boxer"
		],
		correctAnswer:"Golden(?) Retriever"
	},
	{
		pictures:"http://res.cloudinary.com/thcloud/image/upload/v1499392990/pexels-photo-299040_2_ohrutv.jpg",
		answers: [
			"Cavalier King Charles Spaniel",
			"Poodle",
			"Wolf",
			"Yorkshire Terrier"
		],
		correctAnswer:"Cavalier King Charles Spaniel"
	},
	{
		pictures:"http://res.cloudinary.com/thcloud/image/upload/v1498000871/pexels-photo-164186_rxsbsa.jpg",
		answers: [
			"Sweet Fluffy Cutie Pie",
			"Kinder Hazelnut Hippo",
			"Swedish Valhund",
			"Pembroke Welsh Corgi"
		],
		correctAnswer:"Pembroke Welsh Corgi"
	},
	{
		pictures:"http://res.cloudinary.com/thcloud/image/upload/v1498001107/pexels-photo-208936_sdzecd.jpg",
		answers: [
			"Snow Fox",
			"That's a Wolf!",
			"Korean Jindo",
			"Siberian Husky"
		],
		correctAnswer:"That's a Wolf!"
	},
	{
		pictures:"http://res.cloudinary.com/thcloud/image/upload/v1497998952/pexels-photo-191353_u9ddbz.jpg",
		answers: [
			"What a weird cat!",
			"Fox",
			"Chihuahua",
			"Cat.. definitely a cat"
		],
		correctAnswer:"Chihuahua"
	},
	{
		pictures:"http://res.cloudinary.com/thcloud/image/upload/v1497998842/dog-puppy-yorkshire-terrier-yorkshire-terrier-puppy-162321_ogtxjl.jpg",
		answers: [
			"Poodle",
			"Yorkshire Terrier",
			"Chihuahua",
			"Cocker Spaniel"
		],
		correctAnswer:"Yorkshire Terrier"
	},
	{
		pictures:"http://res.cloudinary.com/thcloud/image/upload/v1497999469/pexels-photo-356378_lxdvui.jpg",
		answers: [
			"Alaskan Malamute",
			"Samoyed",
			"const this= wolf",
			"let this= myDogPlease"
		],
		correctAnswer:"Samoyed"
	},
	{
		pictures:"http://res.cloudinary.com/thcloud/image/upload/v1497998367/dalmatians-dog-animal-head_gkei7c.jpg",
		answers: [
			"Dalmatian",
			"Bull Dog",
			"Pitbull",
			"Cattle Dog"
		],
		correctAnswer:"Dalmatian"
	},
	{
		pictures:"http://res.cloudinary.com/thcloud/image/upload/v1497998294/pexels-photo-196547_upo3uo.jpg",
		answers: [
			"Pitbull",
			"Boxer",
			"Pug",
			"Poodle"
		],
		correctAnswer:"Pug"
}];


let questionCount=0;
function startQuiz(){
	let firstQuestion=questions[0];
	$('#start').hide();
	$('#questions').show();
	loadQuestion(firstQuestion);
	loadAnswer(firstQuestion);
	questionCount=questionCount+1;
	$('#questionCount').text(questionCount);
}

function loadQuestion(question){
	$('#pictures').attr("src", question.pictures);
}

function loadAnswer(answer){
	$('.answers label').each(function(index,label){
	$(this).text(answer.answers[index]);
	$('.answers input').prop('checked',false);
	});
}

let number = 0;
function getNextQuestion(){
  number = Number(state.currentQuestion)+1;
	state.currentQuestion= number;
	let nextQuestion=questions[number];
	loadQuestion(nextQuestion);
	loadAnswer(nextQuestion);
	questionCount=questionCount + 1;
	$('#questionCount').text(questionCount);
}

function validateAnswer(){
  let userAnswer=$('input[class="option"]:checked').siblings('label').text();
  let correctAnswer=questions[state.currentQuestion].correctAnswer;
  if(userAnswer===correctAnswer){
   ++state.correctAnswersCount;
   $(".answers").notify("That's Correct!", "success", { position:"bottom"});
		}
		else {
		  $(".answers").notify("That's incorrect!", "error", { position:"bottom"});
		}
}

function quizProgress(){
  let checkRadio =$('input[class="option"]:checked').val();
		if (checkRadio === undefined) {
		 $(".answers").notify("Please choose an answer", "warn", { position:"bottom"});
		}
		else if (questionCount <= 9){
		  validateAnswer();
		  setTimeout(getNextQuestion, 1200);
		}
		else if(questionCount ===10) {
		  validateAnswer();
		  setTimeout(showResults, 1000);
		}
}

function showResults(){
  $('#questions').hide();
  $('#results').show();
  $('#correctCount').text(state.correctAnswersCount);
  if (state.correctAnswersCount === 0 ){
    $('#results #pictures').attr("src","http://res.cloudinary.com/thcloud/image/upload/a_auto_right/a_90/v1498785297/incorrect_ljssnp.jpg");
    $('#allWrong').show();
  }
  else if (state.correctAnswersCount === 10){
    $('#results #pictures').attr("src","http://res.cloudinary.com/thcloud/image/upload/v1499557227/allRight_grv1qa.jpg");
    $('#allRight').show();
  }
}

function restartQuiz(){
  $('#start').show();
  $('#questions').hide();
  $('#results').hide();
  location.reload();
  let number=0;
  let questionCount=0;
  state.correctAnswersCount=0;
  state.currentQuestion=0;
}

$(document).ready(function() {
    $.notify.defaults({autoHideDelay: 1000});
    $('#startQuizButton').on('click', function(event){
		event.preventDefault();
		startQuiz();
	});
	
	$('#quizForm').on('submit', function(event){
		event.preventDefault();
		quizProgress();
	});
	
	$('#tryagain').on('click', function(event){
	  restartQuiz();
	console.log('try Again button is clicked');
	});
});