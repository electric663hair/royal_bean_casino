 // Den shit versjonen
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