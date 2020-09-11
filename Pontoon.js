
var suits = {0: "\u2665",
1: "\u2666",
2: "\u2663",
3: "\u2660"
};
//0:hearts 1:diamonds 2:clubs 3:spades

var deck = setDeck();
kingsCount = 0;

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

function showRules() {
    var list = document.getElementById("rulesList");
    var  displayCurrent = list.style.display;
    if(displayCurrent == "none"){
        document.getElementById("showRules").innerHTML = "Collapse Rules";
        list.style.display = "block";
    }
    else if(displayCurrent == "block"){
        document.getElementById("showRules").innerHTML = "Show Rules";
        list.style.display = "none"
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
function readRule(card){
    rank = (card % 13) + 1;
    return document.getElementById(readRank(rank)).value
    // return rules[rank];
}
function readCard(card){
    rank = (card % 13) + 1
    suit = Math.floor(card / 13);
    return "" + readRank(rank) + " of " + suits[suit];
}

function getCardImage(drawnCard){
    var rank = (drawnCard % 13)
    var suit = Math.floor(drawnCard / 13);
    // console.log(rank + " " + suit);
    var xPos = 180 - (180 * (rank));
    var yPos = -1 * (160 * suit);
    // console.log(xPos + " " + yPos);
    var outputString = "" + xPos + "px " + yPos + "px";
    // console.log(outputString);
    return outputString;
}
function drawCard(){
    if(deck.length > 0){
        drawnCard = deck.shift();
        if((drawnCard % 13) + 1 == 13){
            kingsCount++;
        }
        document.getElementById("card").style.backgroundPosition = "" + getCardImage(drawnCard);
        document.getElementById("card").alt = "" + readCard(drawnCard);
        document.getElementById("deckCount").innerHTML = "" + deck.length +  " Cards Remaining";
        if((drawnCard % 13) + 1 == 13 && kingsCount == 4){
            document.getElementById("rule").innerHTML = "KINGS CUP!!!";
            // document.getElementById("draw").style.display = "hidden";
        }
        else {
            document.getElementById("rule").innerHTML = "" + readRule(drawnCard);
        }
    }
    if(deck.length == 0){
        document.getElementById("draw").style.display = "none";
    }
}
