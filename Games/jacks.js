var balance = 10000

const images = document.querySelectorAll(".image");
images.forEach((image) => {
    image.addEventListener("click", function() {

    })
})


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
        if(intArr[i] === intArr[i+1] && intArr[i] === intArr[i+2]){
                b = 1
        }
    }
    
    for (let i = 0; i < intArr.length - 1; i++){
        if(intArr[i] === intArr[i+1]){
                a = 1
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

function detectHand(hand) {
    const intArr = []
    const suitArr = []
    for (let i = 0; i < 5; i++) {
        intArr.push(hand[i][2]);
        suitArr.push(hand[i][1]);
    }
    
    intArr.sort((a, b) => a - b);

    if (flush(suitArr) && straight(intArr)){
        alert("Straight flush!!!")

    } 

    const bet = (document.querySelector("#betSum").value)

    var gain = bet
    alert(gain)
    if (straight(intArr)){
        alert("Straight!")
        gain *= 4
    } else{
        if (flush(suitArr)) {
            alert("Flush!")
            gain *= 6
        } else{
            if (fourOfKind(intArr)) {
                alert("Four of a Kind!")
                gain *= 25
            } else{
                if (fullHouse(intArr)) {
                    alert("Full House!")
                    gain *= 9
                } else{
                    if (twoPair(intArr)) {
                        alert("TwoPair!")
                        gain *= 2
                    } else{
                        if (threeOfKind(intArr)) {
                            alert("Three of a Kind!")
                            gain *= 3
                        }else {
                            if (pair(intArr)) {
                                alert("Pair!")
                                gain *= 1
                            } else {
                                gain *= 0
                            }
                        }
                    }
                }
            }
        }
    };

    balance += gain
    alert(balance)
    

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
    let deck = [];
    for (let i = 1; i < 14; i++) {
        deck.push(i + "S", i + "C", i + "D", i + "H");
    }
    return deck;
}

function removePlay(){
    document.querySelector("button.play").classList.add("none")  
}
function removeBet(){
    document.querySelector("input").classList.add("none")
}
function addRound2(){
    document.querySelector("button.round2").classList.remove("none")
}
function checkForm(){
    const betamount = (document.querySelector("#betSum").value)
    const form =  document.querySelector("form");
    
    if (form.checkValidity() && betamount < balance) {

        balance -= betamount
        document.querySelector("h3").innerText = "Balance: " + balance
        play();

    } else {
        form.reportValidity();
    }
}

function play() {
    addRound2();
    removeBet();
    
    removePlay();
    
    document.querySelector("button.round2").addEventListener("click", function() {
        round2();
    });

    let suit = "";
    let integer = 0;


    let deck = refreshDeck();
    let Hand1 = [];

    for (let i = 0; i < 5; i++) {
        let randomCard = deck[Math.floor(Math.random() * deck.length)];
        let { suit, integer } = identify(randomCard);
        deck.splice(deck.indexOf(randomCard), 1);
        Hand1.push([randomCard, suit, integer]);

    }

    
    const images = document.querySelectorAll(".image");
    
    function displayCards(Handddd) {
        for (let i = 0; i < 5; i++)  {
            document.getElementById(`card${i+1}`).src = `../resources/cards_png/${Handddd[i][0]}.png`;
    
        }
    }

    displayCards(Hand1)


     
    images.forEach((image) => {
        image.addEventListener("click", function() {
            
            image.classList.toggle("selected")
        });
    })


    

    function round2() {
        let Hand2 = ["", "", "", "", ""];
    
        alert("ROUND 2 START")
    
        for (let i = 0; i < 5; i++)  {
            const imageElement = document.getElementById(`card${i+1}`)
            if (imageElement.classList.contains("selected")) {

                Hand2[i] = Hand1[i]
            }
        }

        for (let i = 0; i < Hand2.length; i++)  {
            if (Hand2[i] == "") {
                let randomCard = deck[Math.floor(Math.random() * deck.length)];
                let { suit, integer } = identify(randomCard);
                deck.splice(deck.indexOf(randomCard), 1);
                Hand2[i] = ([randomCard, suit, integer]);
            }


        }

        displayCards(Hand2)
        document.querySelector("button.round2").classList.add("none")
        
        detectHand(Hand2);
    

    }
    



}


