function detectHand(hand) {
    let ranks = [];
    let counts = Array(13).fill(0); // Array to count occurrences of each rank

    for (let card of hand) {
        if (!card || card.length < 4) return "Invalid hand"; // Check for valid card
        let rank = card[3]; // The rank is the fourth element in the card array
        ranks.push(rank);
        counts[rank - 1]++; // Count the rank occurrences
    }

    counts.sort((a, b) => b - a); // Sort counts in descending order

    // Variables to check for flush and straight
    let flush = false;
    let aceBool = ranks.includes(1); // Check if there is an Ace
    let suitCounts = {}; // Object to count suits
    for (let card of hand) {
        let suit = card[1]; // The suit is the second element in the card array
        suitCounts[suit] = (suitCounts[suit] || 0) + 1; // Count suits
    }
    flush = Object.values(suitCounts).some(count => count >= 5); // Check for flush

    // Check for various hands
    if (counts[0] === 4) return ["Four of a Kind", 25];
    if (counts[0] === 3 && counts[1] === 2) return ["Full House", 9];
    if (counts[0] === 3) return ["Three of a Kind", 3];
    if (counts[0] === 2 && counts[1] === 2) return ["Two Pair", 2];

    if (counts[0] === 2) {
        return (counts[1] >= 11) 
            ? ["One Pair (Jacks or Better)", 1] 
            : ["One Pair (Lower than Jacks)", 0];
    }

    ranks.sort((a, b) => a - b); // Sort ranks to check for straights
    let isStraight = ranks[4] - ranks[0] === 4 && new Set(ranks).size === 5; // Check for straight

    if (isStraight && flush && aceBool) return ["Royal Flush", 800];
    if (isStraight && flush) return ["Straight Flush", 50];
    if (isStraight) return ["Straight", 4];
    if (flush) return ["Flush", 6];
    return ["High Card", 0];
}




function play() {
    let suit = "";
    let num = "";
    let integer = 0;

    function identify(IdentifyCard) {
        let suit = "";
        let num = "";
        let integer = 0;
    
        if (IdentifyCard.includes("S"))
            suit = "Spades";
        else if (IdentifyCard.includes("C"))
            suit = "Clubs";
        else if (IdentifyCard.includes("D"))
            suit = "Diamonds";
        else if (IdentifyCard.includes("H"))
            suit = "Hearts";
    

        
        if (IdentifyCard.includes("13")) {
            integer = 13
            num = "King"
        } else if (IdentifyCard.includes("12")) {
            integer = 12
            num = "Queen"
        } else if (IdentifyCard.includes("11")) {
            integer = 11
            num = "Jack"
        } else if (IdentifyCard.includes("10")) {
            integer = 10
            num = "Ten"
        } else if (IdentifyCard.includes("9")) {
            integer = 9
            num = "Nine"
        } else if (IdentifyCard.includes("8")) {
            integer = 8
            num = "Eight"
        } else if (IdentifyCard.includes("7")) {
            integer = 7
            num = "Seven"
        } else if (IdentifyCard.includes("6")) {
            integer = 6
            num = "Six"
        } else if (IdentifyCard.includes("5")) {
            integer = 5
            num = "Five"
        } else if (IdentifyCard.includes("4")) {
            integer = 3
            num = "Four"
        } else if (IdentifyCard.includes("3")) {
            integer = 3
            num = "Three"
        } else if (IdentifyCard.includes("2")) {
            integer = 2
            num = "Two"
        } else if (IdentifyCard.includes("1")) {
            integer = 1
            num = "Ace"
        }
    
        return { suit, num, integer };
    }
    

    function refreshDeck() {
        let deck = ["10S", "11H", "12D", "13C", "4C"];
        // for (let i = 1; i < 14; i++) {
        //     deck.push(i + "S", i + "C", i + "D", i + "H");
        // }
        return deck;
    }

    function replaceCard(hand, index, deck) {
        
        let chosenCard = deck[Math.floor(Math.random() * deck.length)];
        let { suit, num, integer } = identify(chosenCard);

        deck.splice(hand[index], 1, [chosenCard, suit, num, integer]);
    }

    function displayHand(hand) {
        let display_list = [];

        for (let card of hand) {
            if (card != "") {
                display_list.push(`${card[2]} of ${card[1]}`);
            } else {
                display_list.push("[Discarded]");
            }
        }
        let aaaahand = detectHand(Hand1);

        
        alert("- " + display_list.join(", ") + " -");
        alert(aaaahand)
    }



    let deck = refreshDeck();
    let Hand1 = [];
    let Hand2 = [];


    for (let i = 0; i < 5; i++) {
        let randomCard = deck[Math.floor(Math.random() * deck.length)];
        let { suit, num, integer } = identify(randomCard);
        Hand1.push([randomCard, suit, num, integer]);
    }
    
    document.getElementById("hand1").innerHTML = Hand1;
    alert("Hand1: " + Hand1);

    displayHand(Hand1);
}
