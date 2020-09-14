
var suits = {0: "\u2665",
1: "\u2666",
2: "\u2663",
3: "\u2660"
};
//0:hearts 1:diamonds 2:clubs 3:spades
var deck = [];
var cpuHand = [];
var playerHand = [];
var hands = [cpuHand, playerHand];
var cpuStick = false;
var playerStick = false;

function startGame() {
    deck = setDeck();
    for(i = 0; i < 2; i++){
        cpuHand.push(drawCard())
        playerHand.push(drawCard())
    }
    document.getElementById("CPU-Hand").children[0].style.backgroundPosition = getCardImage(cpuHand[0]);
    document.getElementById("Player-Hand").children[0].style.backgroundPosition = getCardImage(playerHand[0]);
    dealCard(0);
    dealCard(1);
    document.getElementById("GameStart").style.display = "none";
    document.getElementById("Hit").style.display = "inline-block";
    document.getElementById("Stick").style.display = "inline-block";
}

function dealCard(handID) {
    var handString;
    if(handID == 0){
        handString = "CPU";
    } else {
        handString = "Player";
    }
    var handVar = hands[handID];
    var hand = document.getElementById(handString + "-Hand");
    var cards = hand.children;
    newCard = cards[cards.length - 1].cloneNode(true);
    cards[cards.length - 1].classList.add("coveredCard");
    var newId = handString + "card" + (cards.length);
    newCard.setAttribute('id', newId);
    hand.appendChild(newCard);
    document.getElementById(newId).style.zIndex = "1";
    document.getElementById(newId).style.backgroundPosition = getCardImage(handVar[handVar.length - 1]);
}
function playerHit(){
    playerHand.push(drawCard())
    dealCard(1);
    document.getElementById("turn").innerHTML = "CPU's Turn";
    cpuPlay();
}
function cpuPlay() {
    var handTotal = 0;
    for(var i = 0; i < cpuHand.length; i++){
        handTotal += (cpuHand[i] % 13) + 1;
    }
    setTimeout(1000);
    if (handTotal < 17) {
        cpuHand.push(drawCard());
        dealCard(0);
    }
    else if (handTotal > 19) {
        cpuStick = true;
    }
    else {
        if(Math.random() < 0.5){
            cpuHand.push(drawCard());
            dealCard(0);
        }
        else {
            cpuStick = true;
        }
    }
    if (playerStick && !cpuStick){
        cpuPlay();
    }
    else if (playerStick && cpuStick){
        endRound();
    }
    document.getElementById("turn").innerHTML = "Your Turn";
}
function endRound() {
    console.log("Round Over");
    var cpuHandTotal = 0;
    var playerHandTotal = 0;
    cpuHandTotal = countHand(cpuHand);
    playerHandTotal = countHand(playerHand);
    console.log("Cpu " + cpuHandTotal);
    console.log("player " + playerHandTotal);
    if(cpuHandTotal <= 21 && playerHandTotal <= 21){
        if (playerHandTotal > cpuHandTotal){
            document.getElementById("turn").innerHTML = "You Win";
            console.log("You Win");
        }else if (playerHandTotal < cpuHandTotal){
            document.getElementById("turn").innerHTML = "CPU Wins";
            console.log("CPU Win");
        }else {
            document.getElementById("turn").innerHTML = "Draw";
            console.log("Draw Evens");
        }
    }else if(cpuHandTotal > 21 && playerHandTotal <= 21){
        document.getElementById("turn").innerHTML = "You Win";
        console.log("You Win CPU Bust");
    }else if(cpuHandTotal <= 21 && playerHandTotal > 21){
        document.getElementById("turn").innerHTML = "CPU Wins";
        console.log("CPU Win Player Bust");
    }else {
        document.getElementById("turn").innerHTML = "Draw";
        console.log("Draw Double Bust");
    }
}

function playerHold(){
    playerStick = true;
    cpuPlay();
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
