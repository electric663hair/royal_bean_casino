$(window).scroll(function(){
    $(".image").css("top", Math.max(0, 0 - $("body").css("position", "fixed")));
});

var game = {
    "balance": 10000
}

var deck = [];
var Hand1 = [];

const winningsDiv = document.getElementById("winningsDiv")
const winningText = document.getElementById("winningsText")
const profitText = document.getElementById("profitsText")

const betButton = document.querySelector(".play")
const confirmButton = document.querySelector("button.round2")
const continueButton = document.querySelector(".continue")

var maxBet = 1000;
const minBet = 0;
const ascendBetValue = 100;
const descendBetValue = 100;

let select;

let beforeGameStart = true;
let gameStarted;
let gameRound2;

const cardClick = new Audio("../resources/sounds/bubbleSound.mp3");
const soundToggleSound = new Audio("../resources/sounds/soundSwitch.mp3");
const caChing = new Audio("../resources/sounds/ca-ching.mp3");
const manRoyalFlush = new Audio("../resources/sounds/royal-flush.mp3");
const manStraightFlush = new Audio("../resources/sounds/straight-flush.mp3");
const manFourOfAKind = new Audio("../resources/sounds/four-of-a-kind.mp3");
const manThreeOfAKind = new Audio("../resources/sounds/three-of-a-kind.mp3");
const manFullHouse = new Audio("../resources/sounds/full-house.mp3");
const manFlush = new Audio("../resources/sounds/flush.mp3");
const manStraight = new Audio("../resources/sounds/straight.mp3");
const manTwoPair = new Audio("../resources/sounds/two-pair.mp3");
const manPair = new Audio("../resources/sounds/pair.mp3");
const manPairUnderJacks = new Audio("../resources/sounds/pair-under-jacks.mp3");
const manHighCard = new Audio("../resources/sounds/high-card.mp3");

var betamount = document.querySelector("#betSum").value;
const form = document.querySelector("form");




// screenOrientation = screen.orientation.angle;
// if (screenOrientation == 90 || screenOrientation == 270) {
//     $(".ssNone0").removeClass("ssNone");
//     $(".smalLScreenDisclaimer0").removeClass("smallScreenDisclaimer");
// } else {
//     document.querySelectorAll(".ssNone0").classList.add("ssNone");
//     document.querySelectorAll(".smalLScreenDisclaimer0").classList.add("smallScreenDisclaimer");
// }

function openFullscreen() {
    document.getElementById("fullScreen").classList.add("none")
    document.getElementById("exitfullScreen").classList.remove("none")

    let elem = document.documentElement;
  
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitEnterFullscreen) { // For Safari
      elem.webkitEnterFullscreen();
    } else if (elem.msRequestFullscreen) { // For IE11
      elem.msRequestFullscreen();
    }
  }
  

  document.getElementById("fullScreen").addEventListener("click", openFullscreen);

  function closeFullscreen() {
    document.getElementById("exitfullScreen").classList.add("none")
    document.getElementById("fullScreen").classList.remove("none")
  
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { // For Safari
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { // For IE11
      document.msExitFullscreen();
    }
  }

  document.getElementById("exitfullScreen").addEventListener("click", closeFullscreen);

const autoResetGameCheckbox = document.querySelector("#autoResetGame");
autoResetGameCheckbox.checked = (localStorage.getItem("autoReset") === "true");
autoResetGameCheckbox.addEventListener("change", function() {
    localStorage.setItem("autoReset", this.checked);
});

document.querySelectorAll("img").forEach(image => {image.draggable = false;});


document.querySelector("body").addEventListener("keydown", function(event) {
    // Checks for keypresses 1 through 5 and toggles the selected class for the desired image
    for (let i = 0; i < images.length; i++) {
        if (event.key == i+1) {
            if (select) {
                images[i].classList.toggle("selected");
                if (soundToggleVar) {
                    cardClick.play();
                }
            }
        }
    }
});

if (localStorage.getItem("128") && localStorage.getItem("127")) {
    const savedSeed = localStorage.getItem("128");
    const savedBalance = localStorage.getItem("127");
    game.balance = savedBalance / random(savedSeed);

    game.balance = Math.round(game.balance);

    // Update balance text
    document.querySelector("#betSum").placeholder = `Max bet: $${maxBet}...`
    document.querySelector("h3").innerText = "Balance: " + "$" + game.balance;
} else {
    game.balance = 10000;

    document.querySelector("#betSum").placeholder = `Max bet: $${maxBet}...`
    document.querySelector("h3").innerText = "Balance: " + "$" + game.balance;
}

function random(seed) {
    var m = 2 ** 35 - 31;
    var a = 185852;
    var s = seed % m;
    return (s = (s * a) % m) / m;
}

function saveBalance() {
    const currentSeed = Math.floor(Math.random()*4194304);
        localStorage.setItem("128", currentSeed);
        var encryptedBalance = game.balance * random(currentSeed);
        localStorage.setItem("127", encryptedBalance);
}

function checkForm(){
    betamount = document.querySelector("#betSum").value;
    if (form.checkValidity() && betamount <= game.balance && betamount > 0 && betamount <= maxBet) {
        
        game.balance -= betamount;
        saveBalance();

        document.querySelector("h3").innerText = "Balance: $" + game.balance;
        document.querySelector("button.play").classList.add("none");
        document.querySelector("input").disabled = true;
        play(); 

    } else {
        form.reportValidity();
        console.debug("The desired value is not allowed");
    }
}

const betMaxBtn = document.querySelector("#betMax");
betMaxBtn.addEventListener("click", function() {
    if (game.balance >= maxBet) {
        betamount = maxBet;
    } else {
        betamount = game.balance;
    }
    document.querySelector("#betSum").value = betamount;
})

const ruleButton = document.querySelector(".ruleButton")
const rules = document.querySelector(".rules")
ruleButton.addEventListener("click", function() {
    rules.classList.toggle("none")
});


betButton.addEventListener("click", function() {
    document.querySelectorAll(".image").forEach(image => image.classList.remove("secondRound"));
    checkForm();
});

const soundIcon = document.querySelector(".soundIcon");
if (localStorage.getItem("126") === null) {
    var soundToggleVar = true;
} else {
    var soundToggleVar = (localStorage.getItem("126") === "true");
    soundToggle();
}
soundIcon.addEventListener("click", function() {
    soundToggleSound.play();
    soundToggleVar = !soundToggleVar;
    
    soundToggle();
});
function soundToggle() {
    localStorage.setItem("126", soundToggleVar);

    if (soundToggleVar) {
        soundIcon.src = "../resources/soundon.svg"
    } else {
        soundIcon.src = "../resources/soundoff.svg"
    }
}

// For adding ascendBetValue to the betamount
const betUp = document.querySelector(".betUp");
betUp.addEventListener("click", function() {
    let betamount = parseInt(document.querySelector("#betSum").value);
    if (isNaN(betamount)) {
        betamount = 0;
    }

    if (betamount + ascendBetValue <= maxBet) {
        betamount += ascendBetValue;
        document.querySelector("#betSum").value = betamount;
    } else {
        betamount = maxBet;
        document.querySelector("#betSum").value = betamount;
    }
});

// For taking decendBetValue from the betamount
const betDown = document.querySelector(".betDown");
betDown.addEventListener("click", function() {
    let betamount = parseInt(document.querySelector("#betSum").value);
    if (isNaN(betamount)) {
        document.querySelector("#betSum").value = 0;
    }
    if (!isNaN(betamount)) {
        if (betamount - ascendBetValue >= minBet) {
            betamount -= ascendBetValue;
            document.querySelector("#betSum").value = betamount;
        } else {
            betamount = 0;
        }
    }
});

function flush(suitArr) {
    return suitArr.every(suit => suit === suitArr[0]);
}

function fourOfKind(intArr){
    for (let i = 0; i < intArr.length - 3; i++){
        if(intArr[i] === intArr[i+1] && intArr[i] === intArr[i+2] && intArr[i] === intArr[i+3]){
                return true 
        }
    }
}

function fullHouse(intArr) {
    
    let a = 0;
    let b = 0;

    for (let i = 0; i < intArr.length - 2; i++){
        if(intArr[i] === intArr[i+1] && intArr[i] === intArr[i+2] && intArr[i] !== intArr[i+3]  && intArr[i] !== intArr[i-1]){
                b = 1
        }
    }
    
    for (let i = 0; i < intArr.length - 1; i++){
        if(intArr[i] === intArr[i+1] && intArr[i] !== intArr[i+2]  && intArr[i] !== intArr[i-1]){
                a = 1;
        }
    }

    if (a == 1 && b == 1){
        return true
    }
}

function twoPair(intArr) {

    let a;
    let aPair;
    let b;
    let bPair;

    for (let i = 0; i < intArr.length - 1; i++){
        if(intArr[i] === intArr[i+1]){
            a = intArr[i]
            aPair = true;
        }
    }

    for (let i = intArr.length ; i > 0 ; i--){
        if(intArr[i] === intArr[i-1]){
            b = intArr[i]
            bPair = true;
        }
    }

    if (aPair === true && bPair === true && a !== b) {
        return true
    }
    
}

function threeOfKind(intArr){
    for (let i = 0; i < intArr.length - 2; i++){
        if(intArr[i] === intArr[i+1] && intArr[i] === intArr[i+2]){
                return true
        }
    }
}

function pair(intArr){
    for (let i = 0; i < intArr.length - 1; i++){
        if(intArr[i] === intArr[i+1]){
            if (intArr[i] > 10 || intArr[i] == 1){
                return true
            } else if (intArr[i] < 11){
                return false
            }
        }
    }
}

function straight(intArr){
    for (let i = 0; i < intArr.length - 1; i++){
        if (intArr[0] === intArr[1] - 1 && intArr[0] === intArr[2] - 2 && intArr[0] === intArr[3] - 3 && intArr[0] === intArr[4] - 4){
            return true
        }
    }
}

function Royal(intArr){
    return intArr.every(int => int > 9 || int === 1);

}

function detectHand(hand) {
    const intArr = [];
    const suitArr = [];

    payoutTable = {
        "Royal flush": 400,
        "Straight flush": 50,
        "Four of a kind": 25,
        "Full house": 9,
        "Flush": 6,
        "Straight": 4,
        "Three of a kind": 3,
        "Two pair": 2,
        "Pair": 1,
        "Pair under jacks": 0,
        "High card": 0
    }

    for (let i = 0; i < 5; i++) {
        intArr.push(hand[i][2]);
        suitArr.push(hand[i][1]);
    }
    
    intArr.sort((a, b) => a - b);
    if (Royal(intArr) && flush(suitArr)) {
        if (soundToggleVar) {
            caChing.play();
            setTimeout(manRoyalFlush.play(), 1000);
        }
        finalHand = "Royal flush"
        return { winningHand: finalHand, multiplier: payoutTable[finalHand] };
    }
    if (flush(suitArr) && straight(intArr)) {
        if (soundToggleVar) {
            caChing.play();
            setTimeout(manStraightFlush.play(), 1000);
        }
        finalHand = "Straight flush"
        return { winningHand: finalHand, multiplier: payoutTable[finalHand] };
    }
    if (fourOfKind(intArr)) {
        if (soundToggleVar) {
            caChing.play();
            setTimeout(manFourOfAKind.play(), 1000);
        }
        finalHand = "Four of a kind"
        return { winningHand: finalHand, multiplier: payoutTable[finalHand] };
    }
    if (fullHouse(intArr)) {
        if (soundToggleVar) {
            caChing.play();
            setTimeout(manFullHouse.play(), 1000);
        }
        finalHand = "Full house"
        return { winningHand: finalHand, multiplier: payoutTable[finalHand] };
    }
    if (flush(suitArr)) {
        if (soundToggleVar) {
            caChing.play();
            setTimeout(manFlush.play(), 1000);
        }
        finalHand = "Flush"
        return { winningHand: finalHand, multiplier: payoutTable[finalHand] };
    }
    if (straight(intArr)) {
        if (soundToggleVar) {
            caChing.play();
            setTimeout(manStraight.play(), 1000);
        }
        finalHand = "Straight"
        return { winningHand: finalHand, multiplier: payoutTable[finalHand] };
    }
    if (threeOfKind(intArr)) {
        if (soundToggleVar) {
            caChing.play();
            setTimeout(manThreeOfAKind.play(), 1000);
        }
        finalHand = "Three of a kind"
        return { winningHand: finalHand, multiplier: payoutTable[finalHand] };
    }
    if (twoPair(intArr)) {
        if (soundToggleVar) {
            caChing.play();
            setTimeout(manTwoPair.play(), 1000);
        }
        finalHand = "Two pair"
        return { winningHand: finalHand, multiplier: payoutTable[finalHand] };
    }
    if (pair(intArr)) {
        if (soundToggleVar) {
            caChing.play();
            setTimeout(manPair.play(), 1000);
        }
        finalHand = "Pair"
        return { winningHand: finalHand, multiplier: payoutTable[finalHand] };
    }
    if (pair(intArr) === false) {
        if (soundToggleVar) {
            manPairUnderJacks.play();
        }
        finalHand = "Pair under jacks"
        return { winningHand: finalHand, multiplier: payoutTable[finalHand] };
    }
    
    if (soundToggleVar) {
        manHighCard.play();
    }
    finalHand = "High card"
        return { winningHand: finalHand, multiplier: payoutTable[finalHand] };
}

function identify(IdentifyCard) {
    let suit = "";
    let integer = 0;

    if (IdentifyCard.includes("S")) suit = "Spades";
    else if (IdentifyCard.includes("C")) suit = "Clubs";
    else if (IdentifyCard.includes("D")) suit = "Diamonds";
    else if (IdentifyCard.includes("H")) suit = "Hearts";

    integer = parseInt(IdentifyCard.replace(/[^\d]/g, ""));

    return { suit, integer };
}
function refreshDeck() {
    deck = [];
    for (let i = 1; i < 14; i++) {
        deck.push(i + "S", i + "C", i + "D", i + "H");
    }
    return deck;
}

let images = document.querySelectorAll(".image");
images.forEach((image) => {
    image.addEventListener("click", function() {
        if (select) {
            image.classList.toggle("selected");
            if (soundToggleVar) {
                cardClick.play();
            }
        }
    });
});

function play() {
    select = true;

    deck = refreshDeck();
    Hand1 = [];
    let images = document.querySelectorAll(".image");

    images.forEach(image => {image.classList.remove("selected")});
    images.forEach(image => {image.classList.remove("opacity")});
    images.forEach(image => {image.classList.add("scaleOnTouch")});

    confirmButton.classList.remove("none");
    document.querySelector("input").disabled = true;
    betButton.classList.add("none");
    winningsDiv.classList.add("none");

    for (let i = 0; i < 5; i++) {
        let randomCard = deck[Math.floor(Math.random() * deck.length)];
        let { suit, integer } = identify(randomCard);
        deck.splice(deck.indexOf(randomCard), 1);
        Hand1.push([randomCard, suit, integer]);
    }
 
        displayCards(Hand1)

    
    function displayCards(Handddd) {
        for (let i = 0; i < 5; i++)  {
            let cardElement = document.getElementById(`card${i+1}`)
            cardElement.src = `../resources/cards_png/${Handddd[i][0]}.png`;
            cardElement.alt = `The card is ${Handddd[i][1]} ${Handddd[i][2]}`;
        }
    }



    if (!document.querySelector("button.round2").classList.contains("listener-added")) {
        document.querySelector("button.round2").addEventListener("click", function() {
            round2();
        });
        document.querySelector("button.round2").classList.add("listener-added");
    }

    function round2() {
        select = false;
        document.querySelectorAll(".image").forEach(image => image.classList.add("secondRound"));

        game.balance = Math.floor(game.balance);

        let Hand2 = Hand1;
    
        for (let i = 0; i < 5; i++) {
            const imageElement = document.getElementById(`card${i + 1}`);
            if (!imageElement.classList.contains("selected")) {
                let randomCard = deck[Math.floor(Math.random() * deck.length)];
                let { suit, integer } = identify(randomCard);
                deck.splice(deck.indexOf(randomCard), 1);
                Hand2[i] = [randomCard, suit, integer];
            }
        }

        displayCards(Hand2)

        images.forEach(image => image.classList.remove("selected"));
        finish();

        function finish(){
        images.forEach(image => {image.classList.add("opacity")});
        document.querySelector("button.round2").classList.add("none")
        images.forEach(image => {image.classList.remove("scaleOnTouch")});
        
        let { winningHand, multiplier  } = detectHand(Hand2)
        const betamount = document.querySelector("#betSum").value

        game.balance += betamount*multiplier

        document.querySelector("#betSum").placeholder = `Max bet: $${maxBet}...`
        document.querySelector("h3").innerText = "Balance: " + "$" + game.balance;

        saveBalance()
    
        document.getElementById("winningsDiv").classList.remove("none")
        winningText.innerText = `You got ${winningHand} ${multiplier}x`
        profitText.innerText = `You won ${betamount*multiplier}$`

        const resetGameBtn = document.querySelector(".continue");
        

        if (document.querySelector("#autoResetGame").checked) {

            document.querySelector(".play").classList.remove("none");
            resetGameBtn.addEventListener("click", function() {
                if (game.balance <= 0) {
                    resetGame()
                } else {
                    play()
                }
            });
        } else {
            resetGameBtn.classList.remove("none");
            resetGameBtn.addEventListener("click", function() {
                resetGame()
            });
        }

        function resetGame() {
            images.forEach((image) => {
                image.src = "../resources/cards_png/blue_back.png"
            })
            images.forEach(image => {image.classList.remove("opacity")});
            document.getElementById("winningsDiv").classList.add("none")
            
            confirmButton.classList.add("none")
            continueButton.classList.add("none")
            betButton.classList.remove("none")
            document.querySelector("input").disabled = false
        }
        }
    }
}
