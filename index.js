
function swoop(item){
   return document.getElementById(item)
}
function hideButt(butt){
    butt.style.display='none'
}
function unhideButt(butt){
    butt.style.display='inline'
}
let player = {
name :'Kobe',
funds : 200
}

let dealerCards = []
let cards = []
let sum = 0
let dealersum = 0;
let hasBlackJack= false;
let isAlive= false;
let message = '';
let playerEl = swoop('player-el')
playerEl.textContent = player.name+': $'+player.funds
let messageEl = swoop('message-el')
let cardsEl = swoop('cards-el')
let dealersEl = swoop('dealers-el')
let betEl=swoop('bet')
let betButt = swoop('bet-el')
let moreButt = swoop('more-el')
let lessButt = swoop('less-el')
let newCardButt = swoop('newCard-el')
let stayButt = swoop('stay-el')
let dealerBlackJack = false
let dealerBust= false
let playing = false
let playerAce = false
let dealerAce = false
let bet = 10;
let cd1 = swoop('d1')
let cd2 = swoop('d2')
let cd3 = swoop('d3')
let cd4 = swoop('d4')
let cd5 = swoop('d5')
let cd6 = swoop('d6')
let cd7 = swoop('d7')
let cd8 = swoop('d8')
let cp1 = swoop('p1')
let cp2 = swoop('p2')
let cp3 = swoop('p3')
let cp4 = swoop('p4')
let cp5 = swoop('p5')
let cp6 = swoop('p6')
let cp7 = swoop('p7')
let cp8 = swoop('p8')
let cpimg= [cp1,cp2,cp3,cp4,cp5,cp6,cp7,cp8]
let cdimg = [cd1,cd2,cd3,cd4,cd5,cd6,cd7,cd8]
betEl.textContent="BET: $"+bet

//hide play buttons to reduce error and confusion
hideButt(cardsEl)
hideButt(stayButt)
hideButt(newCardButt)
//let sumEl=document.querySelector('.sum-el')
function getRandomCard()
{console.log('getRandomCard function called')
    let random = Math.floor(Math.random()*13)+1;
    return random
}
function getHandValue(list)
{console.log('getHandValue function called')
    val=0
    let ace = false;
    for (i in list){
        if (list[i]>10){val+=10}
        else if (list[i]===1 && ace===false)
            {val+=11
        ace=true}
        else{val+=list[i]}
            }
    if (val>21 && ace===true){
        val-=10}
    return val
}
        
function increase()
{console.log('increase function called')
    bet+=10
    betEl.textContent="BET: $"+bet
}
function decrease()
{console.log('decrease function called')
    bet-=10
    betEl.textContent="BET: $"+bet
}
function cleanTable(list1,list2)
{console.log('cleanTable function called')
for (let i =0; i<8;i++){
    p=list1[i]
    d=list2[i]
    p.hidden=true
    d.hidden=true}
}

function startGame()
{console.log('startgame button pressed.')
if (isAlive===false && bet>=10)
{
    cleanTable(cpimg,cdimg)
    unhideButt(stayButt)
    unhideButt(newCardButt)
    hideButt(betButt)
    hideButt(moreButt)
    hideButt(lessButt)
    player.funds-=bet
    playerEl.textContent = player.name+': $'+player.funds
    isAlive = true
    dealerCards.push(getRandomCard(), getRandomCard())
    dealersum=getHandValue(dealerCards)
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    cards.push(firstCard,secondCard)
    sum= getHandValue(cards)
    display(dealerCards[0],0,cdimg)
    cd2.src='cards/red_joker.png'
    cd2.removeAttribute('hidden')
    renderGame() 
}
}


function display(card,index,list)
{console.log('display function called')
    change=list[index]
    change.removeAttribute('hidden')
if (card===1){change.src='cards/ace_of_clubs.png'}
    else if (card===2){change.src='cards/2_of_clubs.png'}
        else if (card===3){change.src='cards/3_of_clubs.png'}
            else if (card===4){change.src='cards/4_of_clubs.png'}
                else if (card===5){change.src='cards/5_of_clubs.png'}
                    else if (card===6){change.src='cards/6_of_clubs.png'}
                        else if (card===7){change.src='cards/7_of_clubs.png'}
                            else if (card===8){change.src='cards/8_of_clubs.png'}
                                else if (card===9){change.src='cards/9_of_clubs.png'}
                                    else if (card===10){change.src='cards/10_of_clubs.png'}
                                        else if (card===11){change.src='cards/jack_of_clubs.png'}
                                            else if (card===12){change.src='cards/queen_of_spades2.png'}
                                                else if (card===13){change.src='cards/king_of_clubs.png'}
}
function renderGame(){
    console.log('rendergame called')
    sum = getHandValue(cards)
    for (i in cards){
        display(cards[i],i,cpimg)
    }
   
    for (let i=0; i<cards.length; i++){
    }
    if (dealersum>21)
    {
        dealerBust=true
    }
    else if (sum>21) 
    {
        isAlive = false
        payout()
    }
    else if (dealersum===21 && dealerCards.length===2&& sum!=21)
    {
        dealerBlackJack=true
        payout()
    }
    else if (sum <= 20) 
    {
        message = "Would you like to draw a new card?"
    } 
    else if (sum===21 && cards.length===2) 
    {
        hasBlackJack = true;
        payout()
    }
    else if (sum===21)
    {
    stay()
    } 

    messageEl.textContent = message  
}
function newCard()
{console.log('new card func called')
    if (isAlive===true && hasBlackJack ===false)
    {
        let newCard = getRandomCard()
        cards.push(newCard)
    }
renderGame()
}

function reset()
{console.log('reset func called')
    dealersum = 0
    sum = 0
    dealerCards= []
    cards=[]
    isAlive=false
    hasBlackJack=false
    dealerBust=false
    dealerBlackJack=false
    
    playerEl.textContent = player.name+': $'+player.funds
    messageEl.textContent=message+' Would you like to play another hand?'
    
    hideButt(stayButt)
    hideButt(newCardButt)
    unhideButt(betButt)
    unhideButt(moreButt)
    unhideButt(lessButt)
}

function stay()
{ console.log('stay function called')
if (isAlive)
{
while(dealersum<=16)
{
    dealerNew=getRandomCard()
    dealerCards.push(dealerNew)
    dealersum=getHandValue(dealerCards)
} 

if (dealersum>21)
{
    dealerBust=true
}

payout()
}
}

function payout()
{console.log('payout function called')
    
    for (i in dealerCards)
    {
        display(dealerCards[i],i,cdimg)
    }

    if (isAlive===false)
    {
        message='You busted!'
    }
    else if (hasBlackJack)
    {
        player.funds+=bet*2
        message='You got blackjack!'
    }
    else if(dealerBlackJack)
    {
        message='DEALER GOT BLACKJACK!'
    }
    else if (dealerBust===true)
    {
        player.funds+=bet*2
        message='The dealer busted, you win! '
    }
    else if (sum>dealersum)
    {
        player.funds+=bet*2
        message='you have higher cards you win!'
    }
    else if (dealersum>sum)
    {
        message='you have lower cards you lose!'
    }
    else if (dealersum===sum)
    {
        player.funds+=bet
        message='It is a draw!'
} 
    playerEl.textContent = player.name+': $'+player.funds 
    reset()}


