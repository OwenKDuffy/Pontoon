var suits = {0: "\u2665",
1: "\u2666",
2: "\u2663",
3: "\u2660"
};
//0:hearts 1:diamonds 2:clubs 3:spades
var deck;
var cpuHand = [];
var playerHand = [];
var playerStick;
var cpuStick;
var playerBust;
var cpuBust;
var hands = [];
hands["CPU"] = cpuHand;
hands["Player"] = playerHand;

function startGame() {
    // var ai = new gameAI();
    deck = setDeck();
    cpuHand.length = 0;
    playerHand.length = 0;
    playerStick = false;
    cpuStick = false;
    playerBust = false;
    cpuBust = false;
    document.getElementById("CPU-Hand").innerHTML = "";
    document.getElementById("Player-Hand").innerHTML = "";
    for(i = 0; i < 2; i++){
        cpuHand.push(drawCard());
        dealCard("CPU");
        playerHand.push(drawCard());
        dealCard("Player");
    }
    document.getElementById("GameStart").style.display = "none";
    document.getElementById("Hit").style.display = "inline-block";
    document.getElementById("Stick").style.display = "inline-block";
    document.getElementById("turn").innerHTML = "Your Turn";
}

function dealCard(handString) {
    var handVar = hands[handString];
    var hand = document.getElementById(handString + "-Hand");
    var cards = hand.children;
    if(cards.length != 0){
        newCard = cards[cards.length - 1].cloneNode(true);
        cards[cards.length - 1].classList.add("coveredCard");
    }
    else {
        newCard = document.createElement("div");
        newCard.classList.add("card");
        // newCard.style.backgroundPosition = "0px 158px";
        // newCard.innerHTML = '<div class = "card" style="background-position:0px 158px"></div>'
    }
    var newId = handString + "card" + (cards.length);
    newCard.setAttribute('id', newId);
    hand.appendChild(newCard);
    // console.log(`${handString} ${readCard(handVar[handVar.length - 1])}`);
    // document.getElementById(newId).style.zIndex = "1";
    if(handString === "Player"){
        document.getElementById(newId).style.backgroundPosition = getCardImage(handVar[handVar.length - 1]);
    }
    else{
        document.getElementById(newId).style.backgroundPosition = "0px 158px";
    }
}

function cpuPlay(playToFinish) {
    do{
        var handTotal = countHand(cpuHand);
        if (handTotal < 17) {
            cpuHand.push(drawCard());
            dealCard("CPU");
        }
        else if (handTotal > 19) {
            cpuStick = true;
        }
        else if (handTotal > 21) {
            cpuStick = true;
            cpuBust  = true;
            return;
        }
        else {
            if(Math.random() < ((21 - handTotal) * 0.1)){
                cpuHand.push(drawCard());
                dealCard("CPU");
            }
            else {
                cpuStick = true;
            }
        }
    }
    while(playToFinish && !cpuStick && !cpuBust);
    return;
    // document.getElementById("turn").innerHTML = "Your Turn";
}


function playerHit(){
    playerHand.push(drawCard())
    dealCard("Player");
    if(countHand(playerHand) > 21){
        playerBust = true;
        cpuPlay(true);
        endRound();
    }
    // document.getElementById("turn").innerHTML = "CPU's Turn";
    cpuPlay(false);
}

function endRound() {
    //console.log("Round Over");
    var cpuHandTotal = 0;
    var playerHandTotal = 0;
    cpuHandTotal = countHand(cpuHand);
    playerHandTotal = countHand(playerHand);
    document.getElementById("CPU-Hand").querySelectorAll("*").forEach(function(item, index) {
        item.style.backgroundPosition = getCardImage(cpuHand[index]);
    });
    //console.log("Cpu " + cpuHandTotal);
    //console.log("player " + playerHandTotal);
    if(cpuHandTotal <= 21 && playerHandTotal <= 21){
        if (playerHandTotal > cpuHandTotal){
            document.getElementById("turn").innerHTML = "You Win";
            //console.log("You Win");
        }else if (playerHandTotal < cpuHandTotal){
            document.getElementById("turn").innerHTML = "CPU Wins";
            //console.log("CPU Win");
        }else {
            document.getElementById("turn").innerHTML = "Draw Evens";
            //console.log("Draw Evens");
        }
    }else if(cpuHandTotal > 21 && playerHandTotal <= 21){
        document.getElementById("turn").innerHTML = "You Win CPU Bust";
        //console.log("You Win CPU Bust");
    }else if(cpuHandTotal <= 21 && playerHandTotal > 21){
        document.getElementById("turn").innerHTML = "CPU Win Player Bust";
        //console.log("CPU Win Player Bust");
    }else {
        document.getElementById("turn").innerHTML = "Draw Double Bust";
        //console.log("Draw Double Bust");
    }
    document.getElementById("GameStart").style.display = "inline-block";
    document.getElementById("Hit").style.display = "none";
    document.getElementById("Stick").style.display = "none";
}

function playerHold(){
    playerStick = true;
    cpuPlay(true);
    endRound();
}
function resetDeck(){
    deck = setDeck();
    document.getElementById("deckCount").innerHTML = "" + deck.length +  " Cards Remaining";
    document.getElementById("card").style.backgroundPosition = "0px 160px";
    document.getElementById("rule").innerHTML = "<br>";
    document.getElementById("draw").style.display = "inline-block";
}
function setDeck(){
    var deck = [];
    for (var i = 0; i <= 51; i++) {
        deck.push(i);
    }

    shuffle(deck)
    return deck
}
function shuffle(deck) {
    for (var i = deck.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
}

function readRank(card){
    switch(card) {
        case 1:
        return "Ace"
        case 11:
        return "Jack"
        case 12:
        return "Queen"
        case 13:
        return "King"
        default:
        return card
    }
}
function countHand(hand){
    var handTotal = 0;
    for(var i = 0; i < hand.length; i++){
        handTotal += cardValue((hand[i] % 13) + 1);
    }
    return handTotal;
}
function cardValue(card) {
    switch(card) {
        // case 1:
        // return "Ace"
        case 11:
        case 12:
        case 13:
        return 10;
        default:
        return card
    }
}
function readCard(card){
    rank = (card % 13) + 1
    suit = Math.floor(card / 13);
    return "" + readRank(rank) + " of " + suits[suit];
}

function getCardImage(drawnCard){
    var rank = (drawnCard % 13)
    var suit = Math.floor(drawnCard / 13);
    var xPos = 140 - (140 * (rank));
    var yPos = -1 * (158 * suit);
    var outputString = "" + xPos + "px " + yPos + "px";
    return outputString;
}
function drawCard(){
    if(deck.length > 0){
        drawnCard = deck.shift();
        return drawnCard;
    }
}
