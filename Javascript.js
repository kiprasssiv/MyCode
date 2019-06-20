var EasyButton = document.getElementsByClassName('levels')[0];
var MediumButton = document.getElementsByClassName('levels')[1];
var HardButton = document.getElementsByClassName('levels')[2];
var fieldCards = [];
var score = document.getElementById("PlayerScore");
var playingCards = [];
var cardField = document.getElementById("cardField");
var firstCard;
var secondCard;
var firstFlipped;
var currentScore;
var flippedCards = [];
var cardsOnThetable;
var wrong;

function preparingCards(pairs){
	wrong = 1;
	cardsOnThetable = pairs * 2;
	firstFlipped = 0;
	cardField.innerHTML = "";
	playingCards = [];
	fieldCards = [];
	currentScore = 100;
	score.innerHTML = currentScore;
	var cardSigns;
	var cardPower = ["2","3","4","5","6","7","8","9","10","J","Q","K","A"];
	var signArrayPlace;
	var powerArrayPlace;
	var newCard;
	var i;
	for(i = 0; i<pairs; i++){								//Kortu poru sukurimas
		cardSigns = ["S","H","D","C"];
		signArrayPlace = Math.floor(Math.random()*(cardSigns.length));
		powerArrayPlace = Math.floor(Math.random()*(cardPower.length));
		newCard = cardPower[powerArrayPlace] + cardSigns[signArrayPlace];
		fieldCards.push(newCard);
		cardSigns.splice(signArrayPlace,1);
		signArrayPlace = Math.floor(Math.random()*(cardSigns.length));
		newCard = cardPower[powerArrayPlace] + cardSigns[signArrayPlace];
		fieldCards.push(newCard);
		cardPower.splice(powerArrayPlace,1);
	}
	displayCards(pairs);
}
function displayCards(pairs){
	var i;
	var randomizingGameSet;
	var correctlyChosen = [];
	var tableSize = document.getElementById("cardTable");
	for(i = 0; i < pairs*2; i++){							//atsitiktinai žaidimo kortos sudėliojamos masyve
		correctlyChosen.push(0);
		randomizingGameSet = Math.floor(Math.random()*(fieldCards.length));
		playingCards.push(fieldCards[randomizingGameSet]);
		fieldCards.splice(randomizingGameSet,1);
	}
	for(i = 0; i < pairs*2; i++){
		var card = document.createElement("BUTTON"); //kortos kaip mygtukai isdeliojami ir uzkraunamas vaizdas
		card.style.padding = "7.64% 5%";
		card.style.height = "200%";
		card.style.backgroundColor = "white";
		card.style.backgroundImage = "url('images/red_back.png')";
		card.style.backgroundSize = "100% ";
		card.style.border = "none";
		card.style.margin = "2%";
		card.id = playingCards[i];
		card.onclick = clickOne;
		cardField.appendChild(card);
	}
}
function clickOne(){
	if(wrong == 0){
		for(i=0;i<flippedCards.length;i++){					//uzverciamos kortos
				card = document.getElementById(flippedCards[i]);
				card.style.backgroundImage = "url('images/red_back.png')";
			}
		flippedCards = [];
		wrong = 1;
	}
	var card = document.getElementById(this.id);
	var dest = "url('images/"+ this.id +".png')";
	card.style.backgroundImage = dest;
	if(firstFlipped == 1){
		secondCard = this.id;
		firstFlipped = 0;
		flippedCards.push(this.id);
		checking(this.id);}
	else
	{	firstCard = this.id; //atverciama antra korta
		firstFlipped = 1;
		flippedCards.push(this.id);
	}
}
function checking(cardId){
		secondCard = cardId;
		if(firstCard[0] != secondCard[0] || firstCard == secondCard) //patikrinimas ar kortos sudaro pora
		{
			currentScore = currentScore - 2;
			score.innerHTML = currentScore;
			wrong = 0;
		}
	if(flippedCards.length == cardsOnThetable)
	{
		alert("YOU WON");
		preparingCards(cardsOnThetable / 2);
	}
	if(currentScore == 0){
		alert("YOU LOST");
		preparingCards(cardsOnThetable / 2);
	}
}

