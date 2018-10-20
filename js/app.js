/*
 * Create a list that holds all of your cards
 */

let icons=["fa fa-diamond","fa fa-paper-plane-o","fa fa-anchor","fa fa-bolt",
			"fa fa-cube","fa fa-anchor","fa fa-leaf","fa fa-bicycle",
			"fa fa-diamond","fa fa-bomb","fa fa-leaf","fa fa-bomb",
			"fa fa-bolt","fa fa-bicycle","fa fa-paper-plane-o","fa fa-cube"];

/*
Initializing variables
*/

//variable that will hold all our cards (deck)
const cardsContainer = document.querySelector(".deck");

//variables that we will use for comparision purposes
let openedCards=[];
let matchCards=[];

//variables needed for counting moves
let moves=0;
const count = document.querySelector(".moves");
count.innerHTML = 0;

//variables that we need for our timer
let second = 0, minute = 0,hour = 0,interval,finalTime;
const timer = document.querySelector("#timer");

//variables that we need for rating
const starRating = document.querySelector(".stars");
const star = `<li><i class="fa fa-star"></i></li>`;
starRating.innerHTML="";
let totalStars="";

// declaring modal
let modal = document.getElementById("popup");

//Modal's (scoreboard) close icon
let closeicon = document.querySelector(".close");

//variables that we will be using to reset game
const reset = document.querySelector(".restart");
reset.addEventListener("click",function() {

cardsContainer.innerHTML= "";

	initial();
	restart();
});

//TODO: Shuffle cards
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
Creating initial function to shuffle our cards
*/

 function initial ()
{
	//initialized a variable that will be used to shuffle
	let deckShuffle = shuffle(icons);

 // TODO:Create the cards 
	for(let i=0;i<deckShuffle.length;i++) 
	{
		const card = document.createElement("li");
		card.classList.add("card");
		card.innerHTML = `<i class ="${icons[i]}"></i>`;
		cardsContainer.appendChild(card);
	
		//adding onclick function to each card
		onClick(card);

		//reset timer
		timer.innerHTML=`0 mins 0 secs`;
		clearInterval(interval);
	}
}

//TODO: addevent when card is clicked
function onClick(card) 
{
	card.addEventListener ("click",function()
		{
			//here we assign previous and current card.
			const currentCard=this;
			const previousCard=openedCards[0];

			//existing card's here
			if(openedCards.length === 1)
			{
				card.classList.add("open","show","disable");
				openedCards.push(this);	

				//comparing 2 opened cards 
				match(currentCard,previousCard);
			}
		else {
			//no opened cards
			card.classList.add("open","show","disable");
			openedCards.push(this);
	}
});
}

//TODO:function for checking whether its a match or not
function match(currentCard,previousCard) {
	//For "match"
	if(currentCard.innerHTML === previousCard.innerHTML)
	{
     	// Change them to success state
        currentCard.classList.add("show","match","disable");
        previousCard.classList.add("show","match","disable");

        // Add Current & Previous card to matchCards array
        matchCards.push(currentCard, previousCard);
        openedCards=[];
        // Check whether game's over
        endGame();
	}
	//For "no match"
	else {
		//TODO:when they don't match user can't see the card,so setTimeout in here
		setTimeout(function() {
		currentCard.classList.remove("open","show","disable");
		previousCard.classList.remove("open","show","disable");
		},600);
		openedCards=[];
	}
	 moveCount();

	 if (matchCards.length == icons.length)
	 {
	 	scoreCard();
	 }
}

//TODO:function that will check if our game's finished or not
function endGame() {
	if(matchCards.length === icons.length)
	{
		scoreCard();
	}
}

//TODO:function for moves
function moveCount() {
	moves++;
	count.innerHTML = moves;

	if(moves == 1)
	{
		second = 0;
		minute = 0;
		hour = 0;
		timerOn();
	}
	rating();
}

//TODO: function for timer
function timerOn() {
	interval = setInterval(function() {
		timer.innerHTML = `${minute} mins ${second} secs`;
		second++;
		if(second == 60)
		{
			minute++;
			second = 0;
		}
		else if(minute == 60)
		{
			hour++;
			minute = 0;
		}
	},1000);
}

//TODO: function for rating on basis of moves
function rating() {
	if(moves>0 && moves<13)
	{
	starRating.innerHTML = star + star + star;	
	}
	else if(moves>12 && moves<17)
  	{
  	starRating.innerHTML = star + star;
  	}
  	else if (moves>16)
  	{
  	starRating.innerHTML = star;
  	}
  	 totalStars = starRating.innerHTML;
}

//TODO:function for restarting whole game
function restart() {
	matchCards=[];

	//reset moves
	moves = 0;
	count.innerHTML = moves;

	//reset rating
	starRating.innerHTML = "";
	totalStars = "";

	deckShuffle.length = 0;
}

//TODO: popup congratulating user for winning
function scoreCard(){
    /*To be called if it follows following condition
    if (matchCards.length == icons.length)
    */

   	clearInterval(interval);
    finalTime = timer.innerHTML;

    // show modal
    modal.classList.add("show");

    //For showing moves, totaltime,rating on scorecard.
    document.querySelector("#completionTime").innerHTML = moves;
    document.querySelector("#totalTime").innerHTML = finalTime;
    document.querySelector("#starRating").innerHTML = totalStars;

    //closeicon on modal
    closeScoreCard();
}

/*
function for close icon in modal/scoreboard
*/
function closeScoreCard(){
    closeicon.addEventListener("click", function(e){
        modal.classList.remove("show");
    });
}


//Starting game!
initial();

