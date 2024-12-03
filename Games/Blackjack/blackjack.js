var deck = [], playerHand = [], dealerHand = []
var balance = 10000
var betAmount = 0
const text = document.getElementById("text")
const hitButton = document.getElementById("hit")
const standButton = document.getElementById("stand")
const balanceText = document.getElementById("balanceText")
const playerDiv = document.getElementById("playerCards")
const dealerDiv = document.getElementById("dealerCards")
const input = document.getElementById("betInput")

let playerImgElements = playerDiv.querySelectorAll("img")
let dealerImgElements = dealerDiv.querySelectorAll("img")

let currentPromiseResolver = null;

function resetGame() {
    playerHand = [];
    dealerHand = [];
    playerHandSum = 0;
    dealerHandSum = 0;
    playerDiv.innerHTML = '';
    dealerDiv.innerHTML = '';
    text.innerHTML = '';
}


async function checkForm(){
    playerHandSum = 0;
    dealerHandSum = 0;

    playerImgElements.forEach(img => img.remove())
    dealerImgElements.forEach(img => img.remove())

    betAmount = parseFloat(input.value);
    if (!isNaN(betAmount) && betAmount <= balance && betAmount > 0) {
        balance -= betAmount
        balanceText.innerHTML = `Balance: ${balance}`
        playerHand = [], dealerHand = []
        let returnValue = await play();
        text.classList.remove("none")
        if (returnValue === "tie") {
            text.innerHTML = "Push";
            balance += betAmount;
        } else if (returnValue == "won") {
            text.innerHTML = "You won"
            balance += betAmount * 2
        } else if (returnValue == "lost") {
            text.innerHTML = "You lost"
        }
        betButton.classList.remove("none")
        balanceText.innerHTML = `Balance: ${balance}`

        standButton.classList.add("none")
        hitButton.classList.add("none")
        betButton.classList.remove("none")
        input.classList.remove("none")
    }
}

const betButton = document.getElementById("start")
betButton.addEventListener("click", function() {
    checkForm();
    betButton.classList.add("none")
    text.classList.add("none")
});

function identify(IdentifyCard) {
    return parseInt(IdentifyCard);
}

function refreshDeck() {
    deck = [];
    for (let i = 1; i < 14; i++) {
        deck.push(i + "S", i + "C", i + "D", i + "H");
    }
    return deck;
}

function drawCard(hand, containerId, isHidden, isStand) {
    let index = Math.floor(Math.random() * deck.length)
    let card = deck[index]
    deck.splice(index, 1)
    let integer = identify(card)
    hand.push([ card, integer, isHidden ])


    displayCards(hand, containerId, isStand)
    
}

function displayCards(hand, containerId, isStand) {

    const container = document.getElementById(containerId);
    container.innerHTML = '';

    for (let i = 0; i < hand.length; i++) {
        const img = document.createElement("img");
        if (hand[i][2] && !isStand) {
            img.src = `../../resources/cards_png/blue_back.png`;
        } else {
            img.src = `../../resources/cards_png/${hand[i][0]}.png`;
        }
        img.classList.add("image");

        document.getElementById(containerId).appendChild(img);
    }


}

function sum(hand, textId, addFirstCard) {

    let sum = 0, ace = false, amount = 0
    if (addFirstCard) {
        for (let i = 0; i < hand.length; i++) {
            let aa = hand[i][1]

            if (aa == 1) {
                ace = true
                amount = aa
            } else if (aa > 10) {
                amount = 10
            } else {
                amount = aa
            }
            sum += amount

        }
    } else if (!addFirstCard) {
        for (let i = 1; i < hand.length; i++) {
            let aa = hand[i][1]

            if (aa == 1) {
                ace = true
                amount = aa
            } else if (aa > 10) {
                amount = 10
            } else {
                amount = aa
            }
            sum += amount

        }
    }
    if (sum <= 11 && ace) {
        sum += 10
    }
    if (textId == "playerText") {
        document.getElementById(textId).innerHTML = `Player Hand: ${sum}`
    } else {
        document.getElementById(textId).innerHTML = `Dealer Hand: ${sum}`
    }
    return sum
}

// Global variables to track hand sums
let playerHandSum = 0;
let dealerHandSum = 0;

document.getElementById("hit").addEventListener("click", function () {
    if (playerHandSum < 21) {
        drawCard(playerHand, "playerCards", false, false);
        playerHandSum = sum(playerHand, "playerText", true);
        if (playerHandSum > 21) {
            currentPromiseResolver(false);
        }
    }
});

document.getElementById("stand").addEventListener("click", function () {
    hitButton.classList.add("none");
    while (dealerHandSum < 17) {
        drawCard(dealerHand, "dealerCards", false, true);
        dealerHandSum = sum(dealerHand, "dealerText", true);
    }
    if (dealerHandSum > 21 || playerHandSum > dealerHandSum) {
        currentPromiseResolver("won");
    } else if (dealerHandSum > playerHandSum) {
        currentPromiseResolver("lost");
    } else if (dealerHandSum == playerHandSum) {
        currentPromiseResolver("tie");
    }
    hitButton.classList.add("none");
    standButton.classList.add("none");

    
    
});

function play() {
    resetGame()
    return new Promise((resolve) => {
        currentPromiseResolver = resolve;
        input.classList.add("none")
        hitButton.classList.remove("none");
        standButton.classList.remove("none");

        deck = refreshDeck();

        drawCard(playerHand, "playerCards", false, false);
        drawCard(playerHand, "playerCards", false, false);

        drawCard(dealerHand, "dealerCards", true), false;
        drawCard(dealerHand, "dealerCards", false, false);

        playerHandSum = sum(playerHand, "playerText", true);
        dealerHandSum = sum(dealerHand, "dealerText", false);
    });
}
