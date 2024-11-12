var deck = [], playerHand = [], dealerHand = []
const text = document.getElementById("text")

function checkForm(){
    betamount = document.querySelector("#betSum").value;
    const form =  document.querySelector("form");
    if (form.checkValidity() && betamount <= game.balance && betamount > 0 && betamount <= maxBet) {
        game.balance -= betamount
        document.querySelector("h3").innerText = "Balance: $" + game.balance
        document.querySelector("button.play").classList.add("none")
        document.querySelector("input").disabled = true
        play();     

    } else {
        form.reportValidity();
        console.error("The desired value is not allowed")
    }
}

const betButton = document.querySelector(".play")
betButton.addEventListener("click", function() {
    checkForm();
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
                text.innerHTML = "You won"
            } else if (playerHandSum > 21) {
                text.innerHTML = "You lost"
            }
        }
    })

    document.getElementById("stand").addEventListener("click", function() {
        document.getElementById("hit").classList.add("none")

        while (dealerHandSum <= 17) {
            drawCard(dealerHand, "dealerCards")
            dealerHandSum = sum(dealerHand, "dealerSum")
        }
        if (dealerHandSum > 21 || playerHandSum > dealerHandSum) {
            text.innerHTML = "You won"
        } else if (dealerHandSum > playerHandSum) {
            text.innerHTML = "You lost"
        } else if (dealerHandSum == playerHandSum) {
            text.innerHTML = "Push"
        }

    })

}
c