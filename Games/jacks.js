var balance = 10000

//Mark sin
// function flush(suitArr) {
//     return suitArr.every(suit => suit === suitArr[0]);
// }

// function fourOfKind(intArr){
//     for (let i = 0; i < intArr.length - 3; i++){
//         if(intArr[i] === intArr[i+1] && intArr[i] === intArr[i+2] && intArr[i] === intArr[i+3]){
//                 return true 
//         }
//     }
// }

// function fullHouse(intArr) {
    
//     let a = 0;
//     let b = 0;

//     for (let i = 0; i < intArr.length - 2; i++){
//         if(intArr[i] === intArr[i+1] && intArr[i] === intArr[i+2]){
//                 b = 1
//         }
//     }
    
//     for (let i = 0; i < intArr.length - 1; i++){
//         if(intArr[i] === intArr[i+1]){
//                 a = 1
//         }
//     }

//     if (a == 1 && b == 1){
//         return true
//     }
// }

// function twoPair(intArr) {

//     let a;
//     let aPair;
//     let b;
//     let bPair;

//     for (let i = 0; i < intArr.length - 1; i++){
//         if(intArr[i] === intArr[i+1]){
//             a = intArr[i]
//             aPair = true;
//         }
//     }

//     for (let i = intArr.length ; i > 0 ; i--){
//         if(intArr[i] === intArr[i-1]){
//             b = intArr[i]
//             bPair = true;
//         }
//     }

//     if (aPair === true && bPair === true && a !== b) {
//         return true
//     }
    
// }

// function threeOfKind(intArr){
//     for (let i = 0; i < intArr.length - 2; i++){
//         if(intArr[i] === intArr[i+1] && intArr[i] === intArr[i+2]){
//                 return true
//         }
//     }
// }

// function pair(intArr){
//     for (let i = 0; i < intArr.length - 1; i++){
//         if(intArr[i] === intArr[i+1]){
//             if (intArr[i] > 10 || intArr[i] == 1){
//                 return true
//             }
//         }
//     }
// }

// function straight(intArr){
//     for (let i = 0; i < intArr.length - 1; i++){
//         if (intArr[0] === intArr[1] - 1 && intArr[0] === intArr[2] - 2 && intArr[0] === intArr[3] - 3 && intArr[0] === intArr[4] - 4){
//             return true
//         }
//     }
// }

// function detectHand(hand) {
//     const intArr = []
//     const suitArr = []
//     for (let i = 0; i < 5; i++) {
//         intArr.push(hand[i][2]);
//         suitArr.push(hand[i][1]);
//     }
    
//     intArr.sort((a, b) => a - b);

//     if (flush(suitArr) && straight(intArr)){
//         alert("Straight flush!!!")

//     } 

//     const bet = (document.querySelector("#betSum").value)

//     var gain = bet
//     alert(gain)
//     if (straight(intArr)){
//         alert("Straight!")
//         gain *= 4
//     } else{
//         if (flush(suitArr)) {
//             alert("Flush!")
//             gain *= 6
//         } else{
//             if (fourOfKind(intArr)) {
//                 alert("Four of a Kind!")
//                 gain *= 25
//             } else{
//                 if (fullHouse(intArr)) {
//                     alert("Full House!")
//                     gain *= 9
//                 } else{
//                     if (twoPair(intArr)) {
//                         alert("TwoPair!")
//                         gain *= 2
//                     } else{
//                         if (threeOfKind(intArr)) {
//                             alert("Three of a Kind!")
//                             gain *= 3
//                         }else {
//                             if (pair(intArr)) {
//                                 alert("Pair!")
//                                 gain *= 1
//                             } else {
//                                 gain *= 0
//                             }
//                         }
//                     }
//                 }
//             }
//         }
//     };

//     balance += gain
//     alert(balance)
    

// }

// Den bedre versjonen
function detectHand(hand) {

    let integerArray = []

    for (let i = 0; i < hand.length; i++) {
        integerArray.push(hand[i][2])
    }
    integerArray.sort((a, b) => b - a);

    let sCount = 0, cCount = 0, dCount = 0, hCount = 0;

    let flush = false
    for (let i = 0; i < hand.length; i++) {
        if (hand[i][1] == "Spades") {
            sCount++
        } else if (hand[i][1] == "Clubs") {
            cCount++
        } else if (hand[i][1] == "Diamonds") {
            dCount++
        } else if (hand[i][1] == "Hearts") {
            hCount++
        }

        if (sCount == 5 || cCount == 5 || dCount == 5 || hCount == 5) {
            flush = true
        }
    }

    if (flush && JSON.stringify(integerArray) === JSON.stringify(13, 12, 11, 10, 1)) {
        return { winningHand: "Royal flush", multiplier: 800 }
    }
    
    
    let count1 = 0, count2 = 0, count3 = 0, count4 = 0, count5 = 0, count6 = 0, 
        count7 = 0, count8 = 0, count9 = 0, count10 = 0, count11 = 0, count12 = 0, count13 = 0;

    for (let i = 0; i < hand.length; i++) {
        if (hand[i][2] == 13) {
            count13++;
        } else if (hand[i][2] == 12) {
            count12++;
        } else if (hand[i][2] == 11) {
            count11++;
        } else if (hand[i][2] == 10) {
            count10++;
        } else if (hand[i][2] == 9) {
            count9++;
        } else if (hand[i][2] == 8) {
            count8++;
        } else if (hand[i][2] == 7) {
            count7++;
        } else if (hand[i][2] == 6) {
            count6++;
        } else if (hand[i][2] == 5) {
            count5++;
        } else if (hand[i][2] == 4) {
            count4++;
        } else if (hand[i][2] == 3) {
            count3++;
        } else if (hand[i][2] == 2) {
            count2++;
        } else if (hand[i][2] == 1) {
            count1++;
        }
    }

    let countsList = [];
    if (count13 !== 0) countsList.push(count13);
    if (count12 !== 0) countsList.push(count12);
    if (count11 !== 0) countsList.push(count11);
    if (count10 !== 0) countsList.push(count10);
    if (count9 !== 0) countsList.push(count9);
    if (count8 !== 0) countsList.push(count8);
    if (count7 !== 0) countsList.push(count7);
    if (count6 !== 0) countsList.push(count6);
    if (count5 !== 0) countsList.push(count5);
    if (count4 !== 0) countsList.push(count4);
    if (count3 !== 0) countsList.push(count3);
    if (count2 !== 0) countsList.push(count2);
    if (count1 !== 0) countsList.push(count1);

    countsList.sort((a, b) => b - a);


    if (JSON.stringify(countsList) === JSON.stringify([4, 1])) {
        return { winningHand: "Four of a kind", multiplier: 25 };
    } else if (JSON.stringify(countsList) === JSON.stringify([3, 1, 1])) {
        return { winningHand: "Three of a kind", multiplier: 3 };
    } else if (JSON.stringify(countsList) === JSON.stringify([2, 2, 1])) {
        return { winningHand: "Two pair", multiplier: 2 };
    } else if (JSON.stringify(countsList) === JSON.stringify([3, 2])) {
        return { winningHand: "Full house", multiplier: 9 };
    } else if (JSON.stringify(countsList) === JSON.stringify([2, 1, 1, 1])) {
        return { winningHand: "Pair", multiplier: 1 };
    } else if (JSON.stringify(countsList) === JSON.stringify([1, 1, 1, 1, 1]) && flush && integerArray[0] - 4 == integerArray[4]) {
        return { winningHand: "Straight flush", multiplier: 50 };
    } else if (JSON.stringify(countsList) === JSON.stringify([1, 1, 1, 1, 1]) && integerArray[0] - 4 == integerArray[4]) {
        return { winningHand: "Straight", multiplier: 4 };
    } else if (JSON.stringify(countsList) === JSON.stringify([1, 1, 1, 1, 1]) && flush) {
        return { winningHand: "Flush", multiplier: 6 };
    } else if (JSON.stringify(countsList) === JSON.stringify([1, 1, 1, 1, 1])) {
        return { winningHand: "High card", multiplier: 0 };
    }
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


function checkForm(){
    const betamount = document.querySelector("#betSum").value
    const form =  document.querySelector("form");
    
    if (form.checkValidity() && betamount < balance) {

        balance -= betamount
        document.querySelector("h3").innerText = "Balance: " + balance
        document.querySelector("button.play").classList.add("none")
        document.querySelector("input").classList.add("none")
        play();

    } else {
        form.reportValidity();
    }
}

function play() {

    const images = document.querySelectorAll(".image");
    images.forEach((image) => {
        image.addEventListener("click", function() {
            image.classList.remove("selected")
        });
    })

    document.querySelector("button.round2").classList.remove("none")
    document.querySelector("input").classList.add("none")
    document.querySelector("button.play").classList.add("none")
    
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


        images.forEach((image) => {
            image.addEventListener("click", function() {
                image.classList.remove("selected")
            });
        })

        displayCards(Hand2)
        document.querySelector("button.round2").classList.add("none")
        
        const winningText = document.getElementById("winningsText")
        const profitText = document.getElementById("profitsText")
        let { winningHand, multiplier  } = detectHand(Hand2)
        const betamount = document.querySelector("#betSum").value

        balance += betamount*multiplier
        document.querySelector("h3").innerText = "Balance: " + balance

        winningText.innerText = `You got ${winningHand} ${multiplier}x`
        profitText.innerText = `You won ${betamount*multiplier}$`
    
        document.querySelector("button.play").classList.remove("none")
        document.querySelector("input").classList.remove("none")

    

        


    }
    



}


