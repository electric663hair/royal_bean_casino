from random import randint
from random import shuffle
from time import sleep
chips = 10000
Again = True 

def identify(randomCard):
    if "s" in randomCard:
         suit = "Spades"
    elif "c" in randomCard:
       suit = "Clubs"
    elif "d" in randomCard:
        suit = "Diamonds"
    elif "h" in randomCard:
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
    elif "1" in randomCard:
        num = "Ace"
        integer = 14
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

deck = []
for i in range(1, 14):
    i = str(i)
   
    spades = "s" + i
    clubs = "c" + i
    diamonds = "d" + i
    hearts = "h" + i
    deck.append(spades)
    deck.append(clubs)
    deck.append(diamonds)
    deck.append(hearts)
   
def play(bet):
    global Dealerhand
    global chips
    chips -= bet
    print('\033[0m' + "- Chip balance -", '\033[1m' + str(chips))
    
    Playerhand = [] #0 = card, 1 = suit, 2 = num, 3 = int
    Dealerhand = []
    card = ""
    suit = ""
    num = ""
    int = 0
    
    def drawCard(hand):
        card = deck[randint(0,len(deck)-1)]
        suit, num, int = identify(card)
        if card in deck:
            deck.remove(card)
        hand.append((card, suit, num, int))

    drawCard(Playerhand)
    drawCard(Dealerhand)
    def displayCards():

        print()
        print('\033[1m' + "----------------- Dealers Card -----------------")
        print('\033[0m' + "You got", '\033[1m' + Dealerhand[0][2], '\033[0m' + "of", '\033[1m' + Dealerhand[0][1])
        print()
        print('\033[1m' + "------------------ Your Card ------------------")
        print('\033[0m' + "You got", '\033[1m' + Playerhand[0][2], '\033[0m' + "of", '\033[1m' + Playerhand[0][1])
        print()

    sleep(1)

            
    displayCards()

    if Dealerhand[0][3] > Playerhand[0][3]:
        print('\033[1m' + "---------- You Lost ----------")
        print('\033[0m' + "- Chip Balance -", '\033[1m' + str(chips))
    elif Playerhand[0][3] > Dealerhand[0][3]:
        print('\033[1m' + "---------- You Won ----------")
        chips += 2*bet
        print('\033[0m' + "- Chip Balance -", '\033[1m' + str(chips))
    elif Playerhand[0][3] == Dealerhand[0][3]:
        print('\033[1m' + "---------- Tie ----------")
        chips += bet
        print('\033[0m' + "- Chip Balance -", '\033[1m' + str(chips))
    print()
    print()
    print()
    print()
    print()
    print()
        
                

print('\033[1m' + "---------------Welcome to War by Edging Studios---------------")
while chips > 0 and Again == True:
    print('\033[0m' + "- Chip balance -", '\033[1m' + str(chips))
    bet = int(input('\033[0m' + "How much do you want to bet: "))
    if bet > chips:
        print('\033[0m' + "You only have", '\033[1m' + str(chips), '\033[0m' + "chips")
    else:
        play(bet)
        x = input('\033[0m' + "Want to play again? ")
        if "y" in x.lower():
            Again = True
        elif "n" in x.lower():
            Again = False
            print('\033[0m' + "- Chip balance -", '\033[1m' + str(chips))
            print('\033[0m' + "Bye")
if chips == 0:

    print("You are out of chips")
