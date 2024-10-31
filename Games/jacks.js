var balance = 10000

const images = document.querySelectorAll(".image");
images.forEach((image) => {
    image.addEventListener("click", function() {

    })
})

let chipsAmount = 100


function detectHand(hand) {
    let ranks = [];
    let counts = Array(13).fill(0);
    let suitCounts = { S: 0, C: 0, D: 0, H: 0 }; // Count suits
    let aceBool = false;

    // Extracting ranks and counting suits
    for (let card of hand) {
        if (!Array.isArray(card) || card.length < 3) return "Invalid hand"; // Validate the structure

        let suit = card[1]; // Assuming suit is at index 1
        let rank = card[2]; // Assuming rank is at index 2

        // Count ranks
        counts[rank - 1]++;
        ranks.push(rank);

        // Count suits
        suitCounts[suit]++;
        
        // Check for Ace presence
        if (rank === 1) aceBool = true; // Assuming Ace is represented as 1
    }

    // Sort counts to facilitate hand ranking checks
    counts.sort((a, b) => b - a);
    let flush = Object.values(suitCounts).some(count => count >= 5); // Check for flush

    // Hand type checks
    if (JSON.stringify(counts) === JSON.stringify([4, 1])) return ["Four of a Kind", 25];
    if (JSON.stringify(counts) === JSON.stringify([3, 2])) return ["Full House", 9];
    if (JSON.stringify(counts) === JSON.stringify([3, 1, 1])) return ["Three of a Kind", 3];
    if (JSON.stringify(counts) === JSON.stringify([2, 2, 1])) return ["Two Pair", 2];

    // One Pair Check
    if (JSON.stringify(counts) === JSON.stringify([2, 1, 1, 1])) {
        for (let rank = 0; rank < counts.length; rank++) {
            if (counts[rank] === 2) {
                return (rank + 1 >= 11 || rank + 1 === 1) ? ["One Pair (Jacks or Better)", 1] : ["One Pair (Lower than Jacks)", 0];
            }
        }
    }

    // High Card or other checks
    if (JSON.stringify(counts) === JSON.stringify([1, 1, 1, 1, 1])) {
        ranks.sort((a, b) => a - b);
        if (isConsecutive(ranks) && flush && aceBool) return ["Royal Flush", 800];
        if (isConsecutive(ranks) && flush) return ["Straight Flush", 50];
        if (isConsecutive(ranks)) return ["Straight", 4];
        if (flush) return ["Flush", 6];
        return ["High Card", 0];
    }

    return "Invalid hand";
}

// Helper function to check if ranks are consecutive
function isConsecutive(arr) {
    return arr.every((val, index) => index === 0 || val === arr[index - 1] + 1);
}




function isConsecutive(ranks) {
    for (let i = 1; i < ranks.length; i++) {
        if (ranks[i] !== ranks[i - 1] + 1) return false;
    }
    return true;
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
    let betamount = (document.querySelector("#betSum").value)
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
        

        alert(detectHand(Hand2))
    

    }
    



}


