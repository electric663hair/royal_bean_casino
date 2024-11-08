from random import randint
from time import sleep
from random import shuffle
chips = 10000
Again = True 

def getSum(hand, stand):
    Total = 0
    HasAce = False
    if stand == False and hand is Dealerhand:
        for i in range(1, len(hand)):
            if hand[i][2] == "Ace":
                HasAce = True
            Total += hand[i][3]
    else:
        for i in range(len(hand)):
            if hand[i][2] == "Ace":
                HasAce = True
            Total += hand[i][3]

    if Total < 12 and HasAce == True:
        Total += 10
    
    return Total


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
            integer = 10
        elif "12" in randomCard:
            num = "Queen"
            integer = 10
        elif "13" in randomCard:
            num = "King"
            integer = 10
    elif "1" in randomCard:
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

   
def play(bet):
    global Dealerhand
    global chips
    chips -= bet
    print("- Chip balance -", chips)
    
    Playerhand = [] #0 = card, 1 = suit, 2 = num, 3 = int
    Dealerhand = []

    
    def drawCard(hand):
        card = deck[randint(0,len(deck)-1)]
        suit, num, integer_value = identify(card)
        if card in deck:
            deck.remove(card)
        hand.append((card, suit, num, integer_value))

    
    stand = False
    busted = False
    dealerBusted = False

    drawCard(Playerhand)
    drawCard(Playerhand)
    
    drawCard(Dealerhand)
    drawCard(Dealerhand)
    def displayCards(stand):
        print()
        print()
        print()
        print("----------------- Dealers Cards -----------------")

        for i in range(len(Dealerhand)):
            if i == 0 and not stand:
                print("-- Card 1 --")
                print("Hidden")
            else:
                print("-- Card", i + 1,"--")
                print(Dealerhand[i][2], "of", Dealerhand[i][1])

        dealerSum = getSum(Dealerhand, stand)
        print("-- Dealers Sum --")
        print("Sum:", dealerSum)
        print()
        print("------------------ Your Cards ------------------")
        for i in range(len(Playerhand)):
            print("-- Card", i + 1,"--")
            print(Playerhand[i][2], "of", Playerhand[i][1])

        playerSum = getSum(Playerhand, stand)
        print("-- Sum:", playerSum)
        print()
        print()
        print()


    displayCards(stand)
    while not stand and not busted:
        action = input("Hit or Stand: ")
        if action.lower() == "hit":
            drawCard(Playerhand)
            playersum = getSum(Playerhand, stand)
            displayCards(stand)
            if playersum > 21:
                busted = True
                print("-------- You Busted --------")
                print("- Chip Balance -", chips)
                stand = False

        elif action.lower() == "stand":
            stand = True
        else:
            print("Type either Hit or Stand")
     
                

    if stand == True:
        dealersum = getSum(Dealerhand, stand)
        while dealersum < 17:
            drawCard(Dealerhand)
            dealersum = getSum(Dealerhand, stand)
            displayCards(stand)
            input("Next:")
            print()
        displayCards(stand)

        if dealersum > 21:
            dealerBusted = True
            print("---- You Won, Dealer Busted ----")
            chips += 2*bet
            print("- Chip Balance -", chips)
            stand = False

        playersum = getSum(Playerhand, stand)

        if dealersum > playersum and not dealerBusted:
            print("---------- You Lost ----------")
            print("- Chip Balance -", chips)
            stand = False
        elif playersum > dealersum and not dealerBusted and not busted:
            print("---------- You Won ----------")
            chips += 2*bet
            print("- Chip Balance -", chips)
            stand = False
        elif playersum == dealersum:
            print("---------- Tie ----------")
            chips += bet
            print("- Chip Balance -", chips)
            stand = False
        
                


print("---------------Welcome to Blackjack by Edging Studios---------------")
while chips > 0 and Again == True:
    round = 1
    print()
    print(f"---------------Round {round}---------------")
    round += 1
    deck = refreshDeck()
    print("- Chip balance -", chips)
    bet = int(input("How much do you want to bet: "))
    if bet > chips:
        print("You only have", chips, "chips")
    else:
        play(bet)
        