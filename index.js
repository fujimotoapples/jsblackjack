
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
let bet = 0;

//hide play buttons to reduce error and confusion
hideButt(cardsEl)
hideButt(stayButt)
hideButt(newCardButt)
//let sumEl=document.querySelector('.sum-el')
function getRandomCard(){
    let random = Math.floor(Math.random()*13)+1;
    if (random ===1 ){return 11}
    else if(random >10){return 10}
    else {return random}
}
//bet function
function increase(){
    bet+=10
    betEl.textContent="BET: $"+bet
}
function decrease(){
    bet-=10
    betEl.textContent="BET: $"+bet
}
function startGame(){
if (isAlive===false){

    unhideButt(cardsEl)
    unhideButt(stayButt)
    unhideButt(newCardButt)
    hideButt(betButt)
    hideButt(moreButt)
    hideButt(lessButt)
    unhideButt(dealersEl)
    player.funds-=bet
    playerEl.textContent = player.name+': $'+player.funds
    message="Take your turn!"
    messageEl.textContent=message
console.log('startgame button pressed.')
isAlive = true
dealerCards.push(getRandomCard(), getRandomCard())
dealersum=dealerCards[0]+dealerCards[1]
let firstCard = getRandomCard()
let secondCard = getRandomCard()
sum= firstCard+secondCard
cards.push(firstCard,secondCard)
console.log(dealerCards)
console.log(cards)
renderGame() }
}
function renderGame(){
    dealersEl.textContent = 'DEALERS CARDS: ? '+dealerCards[0]
    cardsEl.textContent='Cards: '
    for (let i=0; i<cards.length; i++){
    cardsEl.textContent+=' ' +cards[i]
    }
    if (dealersum>21){
        message = "The dealer busted you win!"
        dealerBust=true
    }
    else if (dealersum===21 && dealerCards.length===2&& sum!=21){
        message= "Dealer has has blackjack! You lose!"
        dealerBlackJack=true
        payout()
    }
    else if (sum <= 20) {
        message = "would you like to draw a new card?"
        console.log("would you like to draw a new card?")
    } else if (sum===21 && cards.length===2) {
        message = "BLACKJACK!!!"
        console.log('blackjack!!')
        hasBlackJack = true;
        payout()}
        else if (sum==21){
            message='you got 21!'
        stay()
    } else  {
        message = "BUST! You're out of the game." 
        console.log('you are out of the game!')
        isAlive = false
        payout()
    }
    messageEl.textContent = message
    
}
function newCard(){
    console.log('new card func called')
    if (isAlive===true && hasBlackJack ===false){
        let newCard = getRandomCard()
        sum += newCard
        cards.push(newCard)
        renderGame()}
}

function reset(){
    console.log('reset func called')
    dealersum = 0
    sum = 0
    dealerCards= []
    cards=[]
    isAlive=false
    dealerBust=false
    dealerBlackJack=false
    playerEl.textContent = player.name+': $'+player.funds
    messageEl.textContent=message+' Would you like to play another hand?'
    hideButt(stayButt)
    hideButt(newCardButt)
    unhideButt(betButt)
    unhideButt(moreButt)
    unhideButt(lessButt)
    /*hideButt(cardsEl)
    hideButt(dealersEl)*/
}

function stay(){
    if (isAlive){
console.log('stay function called')
while(dealersum<=16){
    dealerNew=getRandomCard()
    dealersum+=dealerNew
    if (dealersum>21){dealerBust=true}
    dealerCards.push(dealerNew)}
    dealersEl.textContent = 'Dealers Cards: '
    for (let i=0; i<dealerCards.length;i++){
    dealersEl.textContent += ' '+dealerCards[i] } 
    payout()}
}
function payout(){
    console.log('payout function called')
    if (isAlive===false){
        message='You busted, you lost this hand!'}
    else if (hasBlackJack){player.funds+=bet*2
        message='You got blackjack!'
}
    else if(dealerBlackJack)
        {message='DEALER GOT BLACKJACK!'
    dealersEl.textContent = 'Dealers Cards: '
        for (let i=0; i<dealerCards.length;i++){
        dealersEl.textContent += ' '+dealerCards[i] } }
    else if (dealerBust===true){player.funds+=bet*2
        message='The dealer busted, you win! '}
    else if (sum>dealersum){player.funds+=bet*2
    message='you have higher cards you win!'}
    else if (dealersum>sum){
        message='you have lower cards you lose!'}
    else if (dealersum===sum){player.funds+=bet
    message='It is a draw!'}
        
    playerEl.textContent = player.name+': $'+player.funds 
    reset()
console.log(player.funds)
}
console.log(hasBlackJack)
console.log(message)

