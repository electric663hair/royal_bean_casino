function detectHand(hand) {
    let ranks = [];
    let counts = Array(13).fill(0);

    for (let card of hand) {
        if (!card || card.length < 4) return "Invalid hand";
        let rank = card[3];
        ranks.push(rank);
        counts[rank - 1]++;
    }

    counts.sort((a, b) => b - a);

    let sCount = 0
    let cCount = 0
    let dCount = 0
    let hCount = 0;
    let flush = false
    let aceBool = false;

    for (let card of hand) {
        if (card[0].includes("1")) {
            aceBool = true;
        }
        if (card[0].includes("S")) {
            sCount++;
        } else if (card[0].includes("C")) {
            cCount++;
        } else if (card[0].includes("D")) {
            dCount++;
        } else if (card[0].includes("H")) {
            hCount++;
        }
    }

    if (sCount >= 5 || cCount >= 5 || dCount >= 5 || hCount >= 5) {
        flush = true;
    }
        
    if (JSON.stringify(counts) === JSON.stringify([4, 1])) {
        return ["Four of a Kind", 25];
    } else if (JSON.stringify(counts) === JSON.stringify([3, 2])) {
        return ["Full House", 9];
    } else if (JSON.stringify(counts) === JSON.stringify([3, 1, 1])) {
        return ["Three of a Kind", 3];
    } else if (JSON.stringify(counts) === JSON.stringify([2, 2, 1])) {
        return ["Two Pair", 2];
    } else if (JSON.stringify(counts) === JSON.stringify([2, 1, 1, 1])) {
        for (let rank = 0; rank < counts.length; rank++) {
            if (counts[rank] === 2) {
                if (rank + 1 >= 11 || rank + 1 === 1) {
                    return ["One Pair (Jacks or Better)", 1];
                } else {
                    return ["One Pair (Lower than Jacks)", 0];
                }
            }
        }
    } else if (JSON.stringify(counts) === JSON.stringify([1, 1, 1, 1, 1])) {
        ranks.sort((a, b) => a - b);
        if (isConsecutive(ranks) && flush && aceBool) return ["Royal Flush", 800];
        if (isConsecutive(ranks) && flush) return ["Straight Flush", 50];
        if (isConsecutive(ranks)) return ["Straight", 4];
        if (flush) return ["Flush", 6];
        return ["High Card", 0];
    }

    return "Invalid hand";
}



function play() {
    let suit = "";
    let num = "";
    let integer = 0;

    function identify(IdentifyCard) {
        let suit = "";
        let num = "";
        let integer = 0;
    
        if (IdentifyCard.includes("S")) suit = "Spades";
        else if (IdentifyCard.includes("C")) suit = "Clubs";
        else if (IdentifyCard.includes("D")) suit = "Diamonds";
        else if (IdentifyCard.includes("H")) suit = "Hearts";
    
        integer = parseInt(IdentifyCard.replace(/[^\d]/g, ""));
        num = integer.toString();
    
        return { suit, num, integer };
    }
    

    function refreshDeck() {
        let deck = [];
        for (let i = 1; i < 14; i++) {
            deck.push(i + "S", i + "C", i + "D", i + "H");
        }
        return deck;
    }

    function replaceCard(hand, index, deck) {
        
        let randomInt = deck[Math.floor(Math.random() * deck.length)];
        let { suit, num, integer } = identify(randomInt);

        deck.splice(deck.indexOf(randomInt), 1);

        hand[index] = [randomInt, suit, num, integer];
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
        
        let detectedHand = detectHand(hand);

        // alert("- " + display_list.join(", ") + " -");
        // alert(detectedHand, "ffg");
    }


    let deck = refreshDeck();
    let Hand1 = [];
    let Hand2 = ["", "", "", "", ""];

    for (let i = 0; i < 5; i++) {
        let randomCard = deck[Math.floor(Math.random() * deck.length)];
        let { suit, num, integer } = identify(randomCard);
        deck.splice(deck.indexOf(randomCard), 1);
        Hand1.push([randomCard, suit, num, integer]);
    }

    

    let finished = false



    while (!finished) {
        displayHand(Hand1);
        let x = prompt("Choose a card (1-5) or press Cancel to finish:");

        if (x === null || x === "") {
            finished = true;
        } else {
            x = parseInt(x);

            if (x >= 1 && x <= 5) {
                Hand2[x - 1] = Hand1[x - 1];
            } else {
                // alert("Invalid input. Enter a number between 1 and 5.");
            }
        }
    }
    
    displayHand(Hand2)

    
    

}
