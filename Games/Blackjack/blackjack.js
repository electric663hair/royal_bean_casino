var deck = [], playerHand = [], dealerHand = []
var balance = 10000
var betAmount = 0
const text = document.getElementById("text")
const hitButton = document.getElementById("hit")
const standButton = document.getElementById("stand")
const balanceText = document.getElementById("balanceText")

async function checkForm(){

    betAmount = document.getElementById("betInput").value;
    if (betAmount <= balance && betAmount > 0 && betAmount) {
        balance -= betAmount
        balanceText.innerHTML = `Balance: ${balance}`
        playerHand = [], dealerHand = []
        let returnValue = await play();
        if (returnValue) {
            text.innerHTML = "You won"
            balance += betAmount * 2
        } else if (!returnValue) {
            text.innerHTML = "You lost"
        } else if (returnValue == "tie") {
            text.innerHTML = "Push"
            balance += betAmount
        }
        betButton.classList.remove("none")
        balanceText.innerHTML = `Balance: ${balance}`
    } else {
        form.reportValidity();
        console.error("The desired value is not allowed")
    }
}

const betButton = document.getElementById("start")
betButton.addEventListener("click", function() {
    checkForm();
    betButton.classList.add("none")
});

function identify(IdentifyCard) {
    return parseInt(IdentifyCard.slice(0, -1));
}

function refreshDeck() {
    deck = [];
    for (let i = 1; i < 14; i++) {
        deck.push(i + "S", i + "C", i + "D", i + "H");
    }
    return deck;
}

function drawCard(hand, containerId) {
    let index = Math.floor(Math.random() * deck.length)
    let card = deck[index]
    deck.splice(index, 1)
    let integer = identify(card)
    hand.push({ card, integer })

    const img = document.createElement("img");
    img.src = `../../resources/cards_png/${card}.png`;
    img.classList.add("image");

    document.getElementById(containerId).appendChild(img);
}

function sum(hand, textId) {
    let sum = 0, ace = false, amount = 0

    for (let i = 0; i < hand.length; i++) {
        let aa = hand[i].integer

        if (aa == 1) {ace = true}

        if (aa > 10) {
            amount = 10
        } else {
            amount = aa
        }
        sum += amount

        if (sum <= 11 && ace) {
            sum += 10
        }
    }
    document.getElementById(textId).innerHTML = `${textId}: ${sum}`
    return sum

}

function play() {
    return new Promise ((aaaaaaa) => {
        hitButton.classList.remove("none")
        standButton.classList.remove("none")

        deck = refreshDeck()
        drawCard(dealerHand, "dealerCards");
        drawCard(dealerHand, "dealerCards");

        drawCard(playerHand, "playerCards");
        drawCard(playerHand, "playerCards");

        let playerHandSum = sum(playerHand, "playerSum")
        let dealerHandSum = sum(dealerHand, "dealerSum")

        document.getElementById("hit").addEventListener("click", function() {
            if (playerHandSum < 21) {

                drawCard(playerHand, "playerCards");
                playerHandSum = sum(playerHand, "playerSum")

                     if (playerHandSum == 21) {
                    aaaaaaa(true)

                } else if (playerHandSum > 21) {
                    aaaaaaa(false)
                }
            }
        })

        document.getElementById("stand").addEventListener("click", function() {
            document.getElementById("hit").classList.add("none")

            while (dealerHandSum < 17) {
                drawCard(dealerHand, "dealerCards")
                dealerHandSum = sum(dealerHand, "dealerSum")
            }
            if (dealerHandSum > 21 || playerHandSum > dealerHandSum) {
                aaaaaaa(true)
                hitButton.classList.add("none")
                standButton.classList.add("none")
            } else if (dealerHandSum > playerHandSum) {
                aaaaaaa(false)
                hitButton.classList.add("none")
                standButton.classList.add("none")
            } else if (dealerHandSum == playerHandSum) {
                aaaaaaa("tie")
                hitButton.classList.add("none")
                standButton.classList.add("none")
            }

        })
    })
}