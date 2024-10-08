from random import randint
from random import shuffle
from time import sleep
from collections import Counter
chips = 10000
Again = True 
round = 1


def detectHand(hand):
    ranks = [card[3] for card in hand]      

    rank_counts = Counter(ranks)

    counts = list(rank_counts.values())

    counts.sort(reverse=True)

    sCount = 0
    cCount = 0
    dCount = 0
    hCount = 0
    flush = False
    aceBool = False

    for i in range(len(hand)):

        if "1" in hand[i][0]:
            aceBool = True
        if "S" in hand[i][0]:
            sCount += 1
        elif "C" in hand[i][0]:
            cCount += 1
        elif "D" in hand[i][0]:
            dCount += 1
        elif "H" in hand[i][0]:
            hCount += 1
    if sCount >= 4 or cCount >= 4 or dCount >= 4 or hCount >= 4:
        flush = True
    
    if counts == [4, 1]:  
        return "Four of a Kind", 25
    elif counts == [3, 2]:
        return "Full House", 9
    elif counts == [3, 1, 1]:
        return "Three of a Kind", 3
    elif counts == [2, 2, 1]:
        return "Two Pair", 2
    elif counts == [2, 1, 1, 1]:
        for rank, count in rank_counts.items():
            if count == 2:
                if rank >= 11 or rank == 1:  # Jacks (11), Queens (12), Kings (13), or Aces (1)
                    return "One Pair (Jacks or Better)", 1
                else:
                    return "One Pair (Lower than Jacks)", 0
    
    elif counts == [1, 1, 1, 1, 1]:
        ranks.sort()
        if ranks == list(range(ranks[0], ranks[0] + 5)) and flush and aceBool:
            return "Royal Flush", 800
        elif ranks == list(range(ranks[0], ranks[0] + 5)) and flush:
            return "Straight Flush", 50
        elif ranks == list(range(ranks[0], ranks[0] + 5)):
            return "Straight", 4
        elif flush:
            return "Flush", 6
        else:
            return "High Card", 0
    else:
        return "Invalid hand"
    
def identify(randomCard):
    suit = ""
    num = ""
    integer = 0
    
    if "S" in randomCard:
         suit = "Spades"
    elif "C" in randomCard:
       suit = "Clubs"
    elif "D" in randomCard:
        suit = "Diamonds"
    elif "H" in randomCard:
        suit = "Hearts"

    if "13" in randomCard or "12" in randomCard or "11" in randomCard or "10" in randomCard:
        if "10" in randomCard:
            num = "Ten"
            integer = 10
        elif "11" in randomCard:
            num = "Jack"
            integer = 11
        elif "12" in randomCard:
            num = "Queen"
            integer = 12
        elif "13" in randomCard:
            num = "King"
            integer = 13
    else:
        if "1" in randomCard:
            num = "Ace"
            integer = 1
        elif "2" in randomCard:
            num = "Two"
            integer = 2
        elif "3" in randomCard:
            num = "Three"
            integer = 3
        elif "4" in randomCard:
            num = "Four"
            integer = 4
        elif "5" in randomCard:
            num = "Five"
            integer = 5
        elif "6" in randomCard:
            num = "Six"
            integer = 6
        elif "7" in randomCard:
            num = "Seven"
            integer = 7
        elif "8" in randomCard:
            num = "Eight"
            integer = 8
        elif "9" in randomCard:
            num = "Nine"
            integer = 9

    return suit, num, integer

def refreshDeck():
    deck = []
    for i in range(1, 14):
        i = str(i)

        deck.append("S" + i)
        deck.append("C" + i)
        deck.append("D" + i)
        deck.append("H" + i)
        
    shuffle(deck)
    return deck
   
def play(bet, round_num):
    global chips
    chips -= bet
    print("- Chip balance -", chips)
    
    Cardsround1 = ["" for _ in range(5)] #0 = card, 1 = suit, 2 = num, 3 = int
    DisplayCards = ["" for _ in range(5)]
    finishSelecting = False
    card = ""
    suit = ""
    num = ""
    integer_value = 0

    def replaceCard(hand, index, deck):
        card = deck[randint(0, len(deck)-1)]  # Randomly select the card
        suit, num, integer_value = identify(card)
        deck.remove(card)  # Now safely remove it from the deck after selection
        hand[index] = (card, suit, num, integer_value)  # Replace the card in the hand

    for i in range(5):
        replaceCard(DisplayCards, i, deck)

    def displayCards(hand):
        print()
        print()
        print()
        print(f"--------Cards round {round_num}--------")
        display_list = []
        for card in hand:
            if card != "":
                display_list.append(f"{card[2]} of {card[1]}")
            else:
                display_list.append("[Discarded]")
        print("- " + ", ".join(display_list) + " -")

    displayCards(DisplayCards)
    aa, multiplier = detectHand(DisplayCards)
    print(aa)
    
    while not finishSelecting:
        x = input("Choose a card to keep(leave empty to finish): ")
        if x == "":
            finishSelecting = True
        else:
            x = int(x)
            if 1 <= x <= 5:
                Cardsround1[x-1] = DisplayCards[x-1]
            else:
                print("Choose a card between 1 and 5")

    for i in range(len(Cardsround1)):
        if Cardsround1[i] == "":
            replaceCard(Cardsround1, i, deck)

    displayCards(Cardsround1)
    aa, multiplier = detectHand(Cardsround1)
    print(aa)
    print(f"-- {multiplier}x --")
    print(f"-- + {bet*multiplier} --")
    chips += bet * multiplier
    input()

print("---------------Welcome to Jacks or Better by Royal Bean Studios---------------")
while chips > 0 and Again == True:
    print()
    print(f"---------------Round {round}---------------")
    
    deck = refreshDeck()
    bet = 0
    print("- Chip balance -", chips)

    bet = int(input("How much do you want to bet: "))

    if bet > chips:
        print("You only have", chips, "chips")
    else:
        play(bet, round)
        round += 1