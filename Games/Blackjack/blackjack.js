var deck = []

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
    let integer = 0;

    if (IdentifyCard.includes("13")) {
        integer = 13
    } else if (IdentifyCard.includes("12")) {
        integer = 12
    } else if (IdentifyCard.includes("11")) {
        integer = 11
    } else if (IdentifyCard.includes("10")) {
        integer = 10
    } else if (IdentifyCard.includes("9")) {
        integer = 9
    } else if (IdentifyCard.includes("8")) {
        integer = 8
    } else if (IdentifyCard.includes("7")) {
        integer = 7
    } else if (IdentifyCard.includes("6")) {
        integer = 6
    } else if (IdentifyCard.includes("5")) {
        integer = 5
    } else if (IdentifyCard.includes("4")) {
        integer = 4
    } else if (IdentifyCard.includes("3")) {
        integer = 3
    } else if (IdentifyCard.includes("2")) {
        integer = 2
    } else if (IdentifyCard.includes("1")) {
        integer = 1
    }

    return { integer };
}

function refreshDeck() {
    deck = [];
    for (let i = 1; i < 14; i++) {
        deck.push(i + "S", i + "C", i + "D", i + "H");
    }
    return deck;
}

function drawCard(card) {
    
}


function play() {
    deck = refreshDeck()



}